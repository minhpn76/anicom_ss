import { injectIntl } from 'react-intl'
import React, { memo, Fragment, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router'
import paths from '../../../../helper/pathRoutes'
import { toastify } from '../../../../helper/toast'
import { validateEmail } from '../../../../helper/utils'
import { makeQuestion } from '../../redux'
import { isEmpty } from 'lodash'
import { Formik } from 'formik'
import * as Yup from 'yup'

function MakeQuestion({ intl }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const { questionFAQ } = useSelector(state => ({
    questionFAQ: state.myPoint.questionFAQ
  }))

  const initialValues = () => {
    return {
      userName: '',
      email: '',
      typeQuestion: '',
      question: ''
    }
  }

  const validationSchema = () => {
    return Yup.object().shape({
      userName: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredName' })),
      email: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      typeQuestion: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredQuestionType' })
        ),
      question: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredQuestion' })
        )
    })
  }

  const [isSubmit, setIsSubmit] = useState(false)

  // useEffect(() => {
  // 	const returnMakeQues = location.search && location.search.includes('return=true')
  // 	if (!isEmpty(questionFAQ)) {
  // 		if (returnMakeQues && !isSubmit) {
  // 			return;
  // 		} else {
  // 			history.push(paths.verifyInquiry)
  // 		}
  // 	}
  // }, [questionFAQ, location, isSubmit])

  const [agree, setAgree] = useState(false)
  const onChangeAgree = e => {
    setAgree(e.target.checked)
  }

  const onSubmit = data => {
    // show toast
    if (!agree) {
      toastify({
        type: 'error',
        msg: '??????????????????????????????????????????????????????'
      })
      return
    }
    setIsSubmit(true)
    dispatch(makeQuestion(data))
    history.push(paths.verifyInquiry)
  }

  const handleChange = (e, propsFormik) => {
    propsFormik.setFieldValue('typeQuestion', e.target.value)
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">
            ???????????????????????????????????????
          </p>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues()}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {propsFormik => (
          <form id="form" onSubmit={propsFormik.handleSubmit}>
            <div className="t-contents t-contents--bg-ivory">
              <div className="o-entry">
                <p
                  className="m-animal-header__normal-title u-mb5"
                  style={{ color: '#333' }}
                >
                  ??????????????????????????????
                </p>
                <p
                  className="m-animal-header__normal-title u-mb5"
                  style={{
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: '16px'
                  }}
                >
                  ??????????????????????????????????????????????????????
                </p>
                <p
                  className="m-animal-header__normal-title u-mb5"
                  style={{
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: '16px'
                  }}
                >
                  ????????????????????????????????????????????????
                </p>
                <p className="has-text-centered">
                  ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                  <br />
                  ??????????????????????????????????????????????????????????????????????????????????????????????????????
                </p>
              </div>
              <div className="o-entry" style={{ marginTop: 20 }}>
                <a
                  style={{ cursor: 'pointer' }}
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16"
                  href={paths.faq}
                >
                  ??????????????????????????????
                </a>
              </div>
              <div className="o-entry" style={{ marginTop: 30 }}>
                <div className="o-entry__table">
                  <table className="m-table">
                    <tbody>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            ??????
                          </span>
                          ??????????????????)
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <input
                              className={`a-input-text ${
                                propsFormik.touched.userName &&
                                propsFormik.errors.userName
                                  ? `is-required`
                                  : ``
                              }`}
                              type={'text'}
                              name="userName"
                              value={propsFormik.values.userName}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {propsFormik.touched.userName &&
                            propsFormik.errors.userName && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.userName}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            ??????
                          </span>
                          ??????????????????????????????
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <input
                              type={'email'}
                              className={`a-input-text ${
                                propsFormik.touched.email &&
                                propsFormik.errors.email
                                  ? `is-required`
                                  : ``
                              }`}
                              name="email"
                              value={propsFormik.values.email}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {propsFormik.touched.email &&
                            propsFormik.errors.email && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.email}
                              </span>
                            )}
                          {/* {isInvaildEmail && <span className="u-fwBold u-fz11 a-color--pink">????????????????????????</span>} */}
                          {/* {isInvaildEmailPattern && <span className="u-fwBold u-fz11 a-color--pink">????????????????????????</span>} */}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            ??????
                          </span>
                          ???????????????????????????
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div
                            className="a-input-select a-input-select--area"
                            style={{ width: '100%' }}
                          >
                            <select
                              value={propsFormik.values.typeQuestion}
                              onChange={e => {
                                handleChange(e, propsFormik)
                              }}
                              className={`a-input-select__list ${
                                propsFormik.touched.typeQuestion &&
                                propsFormik.errors.typeQuestion
                                  ? `is-required`
                                  : ``
                              }`}
                              name="typeQuestion"
                            >
                              <option value="" disabled="" selected="">
                                ????????????????????????
                              </option>
                              <option value="1">?????????????????????????????????</option>
                              <option value="2">???????????????????????????</option>
                              <option value="3">
                                ????????????????????????????????????
                              </option>
                              <option value="4">???????????????????????????</option>
                              <option value="5">
                                ?????????????????????????????????????????????
                              </option>
                              <option value="6">????????????</option>
                            </select>
                          </div>
                          {propsFormik.touched.typeQuestion &&
                            propsFormik.errors.typeQuestion && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.typeQuestion}
                              </span>
                            )}
                          {/* {isInvaildTypeQues && <span className="u-fwBold u-fz11 a-color--pink">?????????????????????????????????</span>} */}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            ??????
                          </span>
                          ????????????????????????
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <textarea
                              rows="9"
                              cols="70"
                              className={`a-input-text ${
                                propsFormik.touched.question &&
                                propsFormik.errors.question
                                  ? `is-required`
                                  : ``
                              }`}
                              name={'question'}
                              value={propsFormik.values.question}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {propsFormik.touched.question &&
                            propsFormik.errors.question && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.question}
                              </span>
                            )}
                          {/* {isInvaildQuestion && <span className="u-fwBold u-fz11 a-color--pink">?????????????????????</span>} */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="o-entry" style={{ marginTop: 30 }}>
                <div className="u-mb20">
                  <ul
                    className="m-dots-list"
                    style={{ listStyle: 'none', paddingLeft: 0 }}
                  >
                    <li className="m-dots-list__item">
                      ?????????
                      <a
                        href="https://www.anicom-sompo.co.jp/privacypolicy/"
                        style={{ fontWeight: 'bold' }}
                      >
                        ??????????????????????????????
                      </a>
                      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </li>
                  </ul>
                </div>
                <div
                  className="a-input-checkbox a-input-checkbox--center u-mb20"
                  style={{ justifyContent: 'left' }}
                >
                  <input
                    id="agree"
                    type="checkbox"
                    className="a-input-checkbox__check js-scroll-disabled"
                    name="agree"
                    value="??? ????????????"
                    onChange={onChangeAgree}
                    disabled={!(propsFormik.dirty && propsFormik.isValid)}
                  />
                  <label htmlFor="agree" className="a-input-checkbox__label">
                    ????????????
                  </label>
                </div>
                <button
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16"
                  type={'submit'}
                  disabled={!agree}
                  style={{ width: '200px' }}
                >
                  ??????
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(MakeQuestion))
