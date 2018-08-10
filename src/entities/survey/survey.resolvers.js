const surveyModel = require('./survey.model')
const userModel = require('../user/user.model')
const questionModel = require('../question/question.model')
const voteModel = require('../vote/vote.model')
const contextModel = require('../context/context.model')
const imageModel = require('../image/image.model')
const { ADMIN, USER } = require('../../utils/roles')
const { isUser, userIdIsMatching } = require('../../utils/authUtils')
const { getMatchingId, createHashFromId } = require('../../utils/idStore')
const _ = require('underscore')

module.exports = {
  Query: {
    surveys: async (parent, args, { request }, info) => {
      try {
        const { auth } = request
        switch (auth.role) {
          case ADMIN:
            return await surveyModel.get({})
          case USER:
            return surveyModel.get({ creator: auth.id })
          default:
            throw new Error('Not authorized or no permissions.')
        }
      } catch (e) {
        throw e
      }
    },
    survey: async (parent, { surveyID }, { request }, info) => {
      try {
        const { auth } = request
        const [survey] = await surveyModel.get({ _id: getMatchingId(surveyID) })
        switch (auth.role) {
          case ADMIN:
            return survey
          case USER:
            if (survey.creator === auth.id) return survey
            throw new Error('Not authorized or no permissions.')
          default:
            throw new Error('Not authorized or no permissions.')
        }
      } catch (e) {
        throw e
      }
    },
  },
  Mutation: {
    createSurvey: async (parent, { data }, { request }, info) => {
      try {
        const { auth } = request
        if (!isUser(auth)) { throw new Error('Not authorized or no permissions.') }
        const updatedData = { ...data, creator: auth.user.id }
        const survey = await surveyModel.insert(updatedData)
        return { survey }
      } catch (e) {
        throw e
      }
    },
    updateSurvey: async (parent, { data, surveyID }, { request }, info) => {
      try {
        const { auth } = request
        if (!isUser(auth)) { throw new Error('Not authorized or no permissions.') }
        const matchingId = getMatchingId(surveyID)
        const [survey] = await surveyModel.get({ _id: matchingId })
        if (!userIdIsMatching(auth, `${survey.creator}`)) { throw new Error('Not authorized or no permissions.') }
        const updatedData = data

        /** check if all questions of request are already in survey * */
        if (updatedData.questions) {
          updatedData.questions =
            _.uniq(updatedData.questions).map(questionId => getMatchingId(questionId))

          const presentQuestions = (await questionModel.get({ survey: survey.id }))
            .map(question => `${question.id}`)
          if (_.difference(updatedData.questions, presentQuestions).length === 0) throw new Error('Adding new Questions is not allowed in Survey update.')
        }

        const [updatedSurvey] = await surveyModel.update({ _id: matchingId }, updatedData)
        // TODO:
        //  - notify subscription
        return { survey: updatedSurvey }
      } catch (e) {
        throw e
      }
    },
    deleteSurvey: async (parent, { surveyID }, { request }, info) => {
      try {
        const { auth } = request
        if (!isUser(auth)) { throw new Error('Not authorized or no permissions.') }
        const matchingId = getMatchingId(surveyID)
        const [survey] = await surveyModel.get({ _id: matchingId })
        if (!userIdIsMatching(auth, `${survey.creator}`)) { throw new Error('Not authorized or no permissions.') }
        const result = await surveyModel.delete({ _id: matchingId })
        // TODO:
        //  - notify subscription
        return { success: result.n > 0 }
      } catch (e) {
        throw e
      }
    },
  },
  Survey: {
    id: async (parent, args, context, info) => createHashFromId(parent.id),
    creator: async (parent, args, { request }, info) => {
      try {
        const { auth } = request
        if (!userIdIsMatching(auth, `${parent.creator}`)) { throw new Error('Not authorized or no permissions.') }
        return (await userModel.get({ _id: parent.creator }))[0]
      } catch (e) {
        throw e
      }
    },
    types: async (parent, args, context, info) => (
      (Object.prototype.hasOwnProperty.call(parent.toObject(), 'types')
        && parent.types !== null
        && parent.types.length > 0) ? parent.types : null),
    questions: async (parent, args, context, info) => {
      const questions = await questionModel.get({ survey: parent.id })
      /** Convert array of ids to Object with id:index pairs* */
      const sortObj = parent.questions.reduce((acc, id, index) => ({ ...acc, [`${id}`]: index }), {})
      /** Sort questions depending on the former Array of ids * */
      return _.sortBy(questions, question => sortObj[`${question.id}`])
    },
    votes: async (parent, args, context, info) => {
      try {
        return await voteModel.get({ survey: parent.id })
      } catch (e) {
        throw e
      }
    },
    contexts: async (parent, args, { request }, info) => {
      try {
        const { auth } = request
        if (!userIdIsMatching(auth, `${parent.creator}`)) { throw new Error('Not authorized or no permissions.') }
        return await contextModel.get({ activeSurvey: parent.id })
      } catch (e) {
        throw e
      }
    },
    images: async (parent, args, context, info) => {
      try {
        return await imageModel.get({ survey: parent.id })
      } catch (e) {
        throw e
      }
    },
  },
}
