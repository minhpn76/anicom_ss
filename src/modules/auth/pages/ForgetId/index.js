import { injectIntl } from 'react-intl'
import React, { memo, Fragment, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import paths from '../../../../helper/pathRoutes'
import { forgetId, selectEmailResetPassword } from '../../redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { validateEmail } from '../../../../helper/utils'

function ForgetId({ intl }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const emailResetPassword = useSelector(selectEmailResetPassword)

  // useEffect(()=> {
  // 	if (!emailResetPassword) return
  // 	history.push(paths.confirmResetPassword)
  // }, [emailResetPassword])

  const initialValues = () => {
    return {
      emailFirst: '',
      emailSecond: '',
      email: ''
    }
  }

  const validationSchema = () => {
    return Yup.object().shape({
      emailFirst: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      emailSecond: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      email: Yup.string().when(['emailFirst', 'emailSecond'], {
        is: (emailFirst, emailSecond) =>
          emailFirst && emailSecond
            ? !validateEmail(`${emailFirst}@${emailSecond}`)
            : false,
        then: Yup.string().required(() =>
          intl.formatMessage({ id: 'validation.isEmail' })
        )
      })
    })
  }

  const isInValidEmail = propsFormik => {
    const { errors, values, touched } = propsFormik
    const isTouched = touched.emailFirst || touched.emailSecond
    if (
      !errors.emailFirst &&
      !errors.emailSecond &&
      values.emailFirst &&
      values.emailSecond
    ) {
      return !validateEmail(`${values.emailFirst}@${values.emailSecond}`)
    }
    return isTouched && (errors.emailFirst || errors.emailSecond)
  }

  const isDisbaleSubmit = propsFormik => {
    const { dirty, isValid, submitCount } = propsFormik
    return !dirty || (!isValid && submitCount != 0)
  }

  const onSubmit = data => {
    const email = `${data.emailFirst}@${data.emailSecond}`
    // TODO: call API send mail
    dispatch(
      forgetId({
        email: email
      })
    )
  }

  return (
    <div>
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
                  className="m-animal-header__normal-title u-mb15"
                  style={{ textAlign: 'left', color: '#333' }}
                >
                  ????????????ID?????????????????????????????????????????????
                </p>
                <div className="o-entry__notice">
                  <ul className="m-dots-list">
                    ????????????ID????????????????????????????????????????????????????????????
                    <br />
                    ????????????ID????????????URL????????????????????????
                    <br />
                  </ul>
                </div>
                <div className="o-entry__table o-entry__table--provisional-entry">
                  <table className="m-table">
                    <tbody>
                      <tr>
                        {/* <th className="m-table__head m-table__head--provisional-entry">?????????????????????</th> */}
                        <td className="m-table__body m-table__body--provisional-entry">
                          <div className="m-table__body__2column">
                            <input
                              type="text"
                              name="emailFirst"
                              className={`a-input-text a-input-text--2column ${
                                (isInValidEmail(propsFormik) ||
                                  propsFormik.errors.emailFirst ||
                                  propsFormik.errors.emailSecond) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.emailData}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <span className="a-color--green">@</span>
                            <input
                              type="text"
                              name="emailSecond"
                              className={`a-input-text a-input-text--2column ${
                                (isInValidEmail(propsFormik) ||
                                  propsFormik.errors.emailFirst ||
                                  propsFormik.errors.emailSecond) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.emailData}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {(isInValidEmail(propsFormik) ||
                            propsFormik.errors.emailFirst ||
                            propsFormik.errors.emailSecond) &&
                          propsFormik.submitCount != 0 ? (
                            <span className="u-fwBold u-fz11 a-color--pink">
                              {propsFormik.errors.emailFirst ||
                                propsFormik.errors.emailSecond ||
                                propsFormik.errors.email}
                            </span>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="o-entry__notice">
                  <ul
                    className="m-dots-list"
                    style={{ textAlign: 'center', listStyle: 'none' }}
                  >
                    <li>??????????????????????????????????????????????????????</li>
                    <li>???ani-com.com??????</li>
                    <li>???????????????????????????????????????????????????</li>
                    <li>
                      ???anivoice_noreply@ani-com.com?????????????????????????????????
                    </li>
                  </ul>
                </div>
                <div
                  className="m-table__body__2column"
                  style={{ marginTop: '20px' }}
                >
                  <a
                    type="button"
                    href={paths.faq}
                    className="a-button a-button--shadow3 a-button--round a-button--2column a-button--yellow-green a-button--shadow-yellow-green-2 u-mb10 u-fz16 js-gender-btn"
                  >
                    ?????????????????????
                  </a>
                  <a
                    type="button"
                    class="a-button a-button--shadow3 a-button--round a-button--2column a-button--yellow-green a-button--shadow-yellow-green-2 u-mb10 u-fz16 js-gender-btn"
                    href={paths.inquiry}
                  >
                    ????????????
                  </a>
                </div>
              </div>
            </div>
            <div className="t-footer-contents">
              <div className="t-footer-contents__body">
                <button
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                  type="submit"
                  disabled={isDisbaleSubmit(propsFormik)}
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

export default memo(injectIntl(ForgetId))
