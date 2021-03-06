import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import {
  selectUserProfile,
  selectUserProfileEdit,
  setProfileEdit,
  listAddressByMember,
  selectListAddressByMember,
  checkUserAvaiable,
  checkPasswordAvaiable,
  selectIsAvaiableUser,
  selectIsAvaiablePassword,
  deleteImageUploaded,
  userProfile
} from '../../redux'
import {
  rangeStartToEnd,
  isValidTextKatakana,
  validatePhonenumber,
  validateFeatureDOB,
  validateDOBLatest18,
  validateScopeDay,
  validatePostCode,
  patternPassword
} from '../../../../helper/utils'
import { listGender, listCity, validateEmail } from '../../../../helper/utils'
import pathRoutes from '../../../../helper/pathRoutes'
import { isEmpty } from 'lodash'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormProfileID from '../../../../components/layouts/main/components/FormProfileID'
import FormProfilePassword from '../../../../components/layouts/main/components/FormProfilePassword'
import { Modal } from '../../../../components/commons'
import useModal from '../../../../hook/useModal'
import {
  AddressInfo,
  ShippingAddress
} from '../../../../components/layouts/main/components'
import { FormPostCode } from '../../../../components/commons'
import { injectIntl } from 'react-intl'
import { UploadAvatar } from '../../../../components/commons'

function Profile({ intl }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { isShowing, toggle } = useModal()

  const profile = useSelector(selectUserProfile)
  const profileEdit = useSelector(selectUserProfileEdit)
  const listAddress = useSelector(selectListAddressByMember)
  const isAvailableUser = useSelector(selectIsAvaiableUser)
  const isAvaiablePassword = useSelector(selectIsAvaiablePassword)

  const returnData = location.search && location.search.includes('return=true')

  useEffect(() => {
    dispatch(listAddressByMember())
  }, [])

  const userInfo = useMemo(() => {
    if (isEmpty(profile)) {
      return {}
    }
    if (isEmpty(profile.info)) return {}
    const parseInfo = JSON.parse(profile.info)
    const user = parseInfo.reduce(function (parseInfo, cur, i) {
      parseInfo[cur.name] = cur.value
      return parseInfo
    }, {})
    return user
  }, [profile])

  const initialValues = () => {
    const init = {
      lrvPassword: '',
      firstName: '',
      secondName: '',
      firstNameFurigana: '',
      secondNameFurigana: '',
      gender: '',
      day: '',
      month: '',
      year: '',
      zipCode1: '',
      zipCode2: '',
      city: '',
      ward: '',
      streetAddress: '',
      apartment: '',
      phone1: '',
      phone2: '',
      phone3: '',
      profileID: '0',
      profilePassword: '0',
      emailData: '',
      emailExtend: '',
      emailConfData: '',
      emailConfExtend: '',
      lrvPasswordCurrent: '',
      lrvPasswordNew: '',
      lrvPasswordNewCof: ''
    }
    if (!isEmpty(profileEdit) && returnData) {
      return {
        firstName: profileEdit?.firstName,
        secondName: profileEdit?.secondName,
        firstNameFurigana: profileEdit?.firstNameFurigana,
        secondNameFurigana: profileEdit?.secondNameFurigana,
        gender: profileEdit?.gender,
        day: profileEdit?.day,
        month: profileEdit?.month,
        year: profileEdit?.year,
        zipCode1: profileEdit?.zipCode1,
        zipCode2: profileEdit?.zipCode2,
        city: profileEdit?.city,
        ward: profileEdit?.ward,
        streetAddress: profileEdit?.streetAddress,
        apartment: profileEdit?.apartment,
        phone1: profileEdit?.phone1,
        phone2: profileEdit?.phone2,
        phone3: profileEdit?.phone3,
        profileID: profileEdit?.profileID,
        profilePassword: profileEdit?.profilePassword,
        emailData: profileEdit?.emailData,
        emailExtend: profileEdit?.emailExtend,
        emailConfData: profileEdit?.emailConfData,
        emailConfExtend: profileEdit?.emailConfExtend,
        lrvPasswordCurrent: profileEdit?.lrvPasswordCurrent,
        lrvPasswordNew: profileEdit?.lrvPasswordNew,
        lrvPasswordNewCof: profileEdit?.lrvPasswordNewCof
      }
    }
    if (!isEmpty(userInfo)) {
      // alert(userInfo.zipCode);
      return {
        firstName: userInfo.name ? userInfo.name.split(' ')[0] : '',
        secondName: userInfo.name ? userInfo.name.split(' ')[1] : '',
        firstNameFurigana: userInfo.nameFurigana.split(' ')[0],
        secondNameFurigana: userInfo.nameFurigana.split(' ')[1],
        gender: userInfo.gender ?? '',
        day: userInfo.dob ? userInfo.dob.split('/')[2] : '',
        month: userInfo.dob ? userInfo.dob.split('/')[1] : '',
        year: userInfo.dob ? userInfo.dob.split('/')[0] : '',
        zipCode1: userInfo.zipCode ? userInfo.zipCode.split('-')[0] : '',
        zipCode2: userInfo.zipCode ? userInfo.zipCode.split('-')[1] : '',
        city: userInfo.city ?? '',
        ward: userInfo.ward ?? '',
        streetAddress: userInfo.streetAddress ?? '',
        apartment: userInfo.apartment ?? '',
        phone1: userInfo.phoneNumber ? userInfo.phoneNumber.split('-')[0] : '',
        phone2: userInfo.phoneNumber ? userInfo.phoneNumber.split('-')[1] : '',
        phone3: userInfo.phoneNumber ? userInfo.phoneNumber.split('-')[2] : '',
        profileID: '0',
        profilePassword: '0'
      }
    }
    return init
  }

  const validationSchema = () => {
    return Yup.object().shape({
      // lrvPassword: Yup.string()
      //   .trim()
      //   .matches(patternPassword, "????????????8?????????16????????????????????????????????????")
      //   .required(() => "??????????????????????????????"),
      lrvPasswordCof: Yup.string()
        .trim()
        .oneOf(
          [Yup.ref('lrvPasswordNewCof'), null],
          '?????????????????????????????????????????????'
        ),
      firstName: Yup.string()
        .trim()
        .required(() => '??????????????????????????????????????????'),
      secondName: Yup.string()
        .trim()
        .required(() => '??????????????????????????????????????????'),
      firstNameFurigana: Yup.string()
        .trim()
        .required(() => '????????????????????????????????????????????????????????????'),
      secondNameFurigana: Yup.string()
        .trim()
        .required(() => '????????????????????????????????????????????????????????????'),
      gender: Yup.string().required(() => '?????????????????????'),
      day: Yup.string()
        .trim()
        .required(() => '???????????????????????????'),
      month: Yup.string()
        .trim()
        .required(() => '???????????????????????????'),
      year: Yup.string()
        .trim()
        .required(() => '???????????????????????????'),
      phone1: Yup.string()
        .trim()
        .required(() => '???????????????????????????'),
      phone2: Yup.string()
        .trim()
        .required(() => '???????????????????????????'),
      phone3: Yup.string()
        .trim()
        .required(() => '???????????????????????????'),
      zipCode1: Yup.string()
        .trim()
        .required(() => '???????????????????????????????????????????????????'),
      zipCode2: Yup.string()
        .trim()
        .required(() => '???????????????????????????????????????????????????'),
      zipCode: Yup.string().when(['zipCode1', 'zipCode2'], {
        is: (zipCode1, zipCode2) =>
          zipCode1 && zipCode2
            ? !validatePostCode({ zipCode1, zipCode2 })
            : false,
        then: Yup.string().required(() =>
          intl.formatMessage({ id: 'validation.isAddressNumber' })
        )
      }),
      city: Yup.string()
        .trim()
        .required(() => '?????????????????????'),
      ward: Yup.string()
        .trim()
        .required(() => '?????????????????????'),
      streetAddress: Yup.string()
        .trim()
        .required(() => '?????????????????????'),
      dob: Yup.string().when(['day', 'month', 'year'], {
        is: (day, month, year) => validateFeatureDOB({ day, month, year }),
        then: Yup.string().required('?????????????????????????????????????????????')
      }),
      dobLatest18: Yup.string().when(['day', 'month', 'year'], {
        is: (day, month, year) => validateDOBLatest18({ day, month, year }),
        then: Yup.string().required(
          intl.formatMessage({ id: 'validation.checkAdult' })
        )
      }),
      dobScopeDay: Yup.string().when(['day', 'month'], {
        is: (day, month) => validateScopeDay({ day, month }),
        then: Yup.string().required(
          intl.formatMessage({ id: 'validation.isDate' })
        )
      }),
      phoneNumber: Yup.string().when(['phone1', 'phone2', 'phone3'], {
        is: (phone1, phone2, phone3) =>
          phone1 && phone2 && phone3
            ? !validatePhonenumber(`${phone1}-${phone2}-${phone3}`)
            : false,
        then: Yup.string().required('???????????????????????????????????????????????????')
      }),
      nameFurigana: Yup.string().when(
        ['firstNameFurigana', 'secondNameFurigana'],
        {
          is: (firstNameFurigana, secondNameFurigana) =>
            firstNameFurigana && secondNameFurigana
              ? !isValidTextKatakana(
                  `${firstNameFurigana}${secondNameFurigana}`
                )
              : false,
          then: Yup.string().required('??????????????????????????????????????????')
        }
      ),
      emailData: Yup.string()
        .trim()
        .when(['profileID'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('????????????????????????')
        }),
      emailConfData: Yup.string()
        .trim()
        .when(['profileID'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('????????????????????????')
        }),
      email: Yup.string().when(['emailData', 'emailExtend'], {
        is: (emailData, emailExtend) =>
          emailData && emailExtend
            ? !validateEmail(`${emailData}@${emailExtend}`)
            : false,
        then: Yup.string().required('?????????????????????????????????????????????')
      }),
      emailConfData: Yup.string()
        .trim()
        .when(['profileID'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('???????????????????????????????????????')
        })
        .oneOf([Yup.ref('emailData'), null], '????????????????????????????????????'),
      emailConfExtend: Yup.string()
        .trim()
        .when(['profileID'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('???????????????????????????????????????')
        })
        .oneOf([Yup.ref('emailExtend'), null], '????????????????????????????????????'),
      emailConf: Yup.string().when(
        ['emailConfData', 'emailConfExtend', 'profileID'],
        {
          is: (emailConfData, emailConfExtend, profileID) =>
            profileID !== '1'
              ? false
              : !validateEmail(`${emailConfData}@${emailConfExtend}`),
          then: Yup.string().required('?????????????????????????????????????????????')
        }
      ),
      lrvPasswordCurrent: Yup.string()
        .trim()
        .when(['profilePassword'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('??????????????????????????????????????????')
        }),
      lrvPasswordNew: Yup.string()
        .trim()
        .matches(
          patternPassword,
          intl.formatMessage({ id: 'validation.passwordLength' })
        )
        .when(['profilePassword'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('??????????????????????????????????????????????????????')
        }),
      lrvPasswordNewCof: Yup.string()
        .trim()
        .matches(
          patternPassword,
          intl.formatMessage({ id: 'validation.passwordLength' })
        )
        .when(['profilePassword'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required(
            '?????????????????????????????????????????????????????????????????????'
          )
        })
        .oneOf([Yup.ref('lrvPasswordNew'), null], '????????????????????????????????????')
    })
  }

  const isDisableSubmit = useCallback(
    propsFormik => {
      const { profileID, profilePassword } = propsFormik.values
      if (profileID === '1' && !isAvailableUser) {
        return true
      }
      if (profilePassword === '1' && !isAvaiablePassword) {
        return true
      }
      return false
    },
    [isAvailableUser, isAvaiablePassword]
  )

  const onSubmit = data => {
    dispatch(
      setProfileEdit({
        ...data,
        email:
          data?.profileID === '0'
            ? profile?.email
            : `${data?.emailData}@${data?.emailExtend}`,
        avatarUrl: profile?.avatar_url
          ? profile?.avatar_url
          : '../assets/img/profile/user.png'
      })
    )
    history.push(pathRoutes.editProfileVerify)
  }

  const isInvalidName = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { firstName, secondName } = values
    const isTouched = touched.firstName || touched.secondName
    return isTouched && (errors.firstName || errors.secondName)
  }

  const isInValidZipCode = propsFormik => {
    const { errors, values, touched } = propsFormik
    const isTouched = touched.zipCode1 || touched.zipCode2
    return isTouched && (errors.zipCode1 || errors.zipCode2)
  }

  const isInvalidNameFuri = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { firstNameFurigana, secondNameFurigana } = values
    const isTouched = touched.firstNameFurigana || touched.secondNameFurigana
    if (!firstNameFurigana || !secondNameFurigana) {
      return (
        isTouched && (errors.firstNameFurigana || errors.secondNameFurigana)
      )
    }
    return !isValidTextKatakana(`${firstNameFurigana}${secondNameFurigana}`)
  }

  const isInvaildDOB = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { day, month, year } = values
    if (
      errors.day ||
      errors.month ||
      errors.year ||
      errors.dobLatest18 ||
      errors.dobScopeDay
    ) {
      return true
    }
    return (
      validateDOBLatest18(day, month, year) ||
      validateScopeDay({ day, month }) ||
      validateFeatureDOB({ day, month, year })
    )
  }

  const isInVaildPhone = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { phone1, phone2, phone3 } = values
    if (errors.phone1 || errors.phone2 || errors.phone3) {
      return true
    }
    if (!phone1 || !phone2 || !phone3) {
      return false
    }
    return !validatePhonenumber(`${phone1}-${phone2}-${phone3}`)
  }

  const onBlurCheckUserAvai = propsFormik => {
    const { emailConfData, emailConfExtend } = propsFormik.values
    if (propsFormik.errors.emailConfData || propsFormik.errors.emailConfData) {
      return
    }
    dispatch(
      checkUserAvaiable({
        email: `${emailConfData}@${emailConfExtend}`
      })
    )
  }

  const onBlurCheckPasswordAvai = propsFormik => {
    if (propsFormik?.errors.lrvPasswordCurrent) {
      return
    }
    dispatch(
      checkPasswordAvaiable({
        username: profile?.email,
        /*propsFormik?.values?.profileID === '0'
        ? profile?.email
        : `${propsFormik?.values?.emailData}@${propsFormik?.values?.emailExtend}`,*/
        password: propsFormik?.values?.lrvPasswordCurrent
      })
    )
  }

  const handleShippingAddress = () => {
    history.push(pathRoutes.shippingAddress)
  }

  const handleDeleteImageUpload = e => {
    e.preventDefault()
    dispatch(
      deleteImageUploaded({
        onSuccess: () => {
          dispatch(userProfile())
        }
      })
    )
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">?????????????????????????????????</p>
        </div>
      </div>
      <div className="m-animal-header">
        <p className="m-animal-header__normal-title">
          ?????????????????????????????????????????????????????????
        </p>
        <div className="m-animal-header__animal-box">
          <div className="m-animal-header__animal-position">
            <img
              src="../assets/img/common/img_animals-image_2.png"
              className="m-animal-header__animal-image"
              alt=""
            />
          </div>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues()}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {propsFormik => (
          <>
            <form id="form" onSubmit={propsFormik.handleSubmit}>
              <div className="t-contents t-contents--bg-ivory">
                <div className="o-entry">
                  <div className="o-entry__table o-entry__table--border-bottom">
                    <table className="m-table">
                      <tbody>
                        <tr>
                          <th
                            className="m-table__head m-table__head--entry"
                            colSpan={2}
                          >
                            <div className="o-entry__notice">
                              ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            ??????????????? <br />
                            ?????????????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <div
                                style={{ width: '50px', position: 'relative' }}
                              >
                                {profile?.avatar_url ? (
                                  <img
                                    src={profile?.avatar_url}
                                    style={{ width: '100%' }}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    src="../assets/img/profile/user.png"
                                    style={{ width: '100%' }}
                                    alt=""
                                  />
                                )}
                                <UploadAvatar />
                              </div>
                              <div style={{ marginLeft: '20px' }}>
                                {profile?.avatar_url && (
                                  <button
                                    style={{ padding: '10px 20px' }}
                                    className="a-button a-button--submit a-button--round u-fz16"
                                    onClick={handleDeleteImageUpload}
                                  >
                                    ???????????????
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            ????????????ID???????????????????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div className="m-table__body__icon">
                              <p style={{ fontSize: '16px' }}>
                                {profile.email}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry"></th>
                          <td className="m-table__body m-table__body--entry">
                            <select
                              name="profileID"
                              className="a-input-select__list"
                              value={propsFormik.values.profileID}
                              onChange={propsFormik.handleChange}
                              selected=""
                            >
                              <option value="0">????????????ID??????????????????</option>
                              <option value="1">????????????ID???????????????</option>
                            </select>
                          </td>
                        </tr>
                        {propsFormik.values.profileID === '1' && (
                          <FormProfileID
                            propsFormik={propsFormik}
                            onBlurCheckUserAvai={onBlurCheckUserAvai}
                          />
                        )}
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            ???????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <select
                              className="a-input-select__list"
                              name="profilePassword"
                              value={propsFormik.values.profilePassword}
                              onChange={propsFormik.handleChange}
                              selected=""
                            >
                              <option value="0">?????????????????????????????????</option>
                              <option value="1">??????????????????????????????</option>
                            </select>
                          </td>
                        </tr>
                        {propsFormik.values.profilePassword === '1' && (
                          <FormProfilePassword
                            propsFormik={propsFormik}
                            onBlurCheckPasswordAvai={onBlurCheckPasswordAvai}
                          />
                        )}
                        <tr>
                          <th
                            className="m-table__head m-table__head--entry"
                            colSpan={2}
                          >
                            <div className="o-entry__notice">
                              <ul className="m-dots-list">
                                <li>
                                  ?????????????????????????????????????????????????????????ani-com.com?????????????????????????????????
                                </li>
                                <li>
                                  ??????????????????????????????????????????????????????anivoice_noreply@ani-com.com?????????????????????????????????
                                </li>
                              </ul>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            <span className="m-table__head__label m-table__head__label--required">
                              ??????
                            </span>
                            ?????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div className="m-table__body__2column">
                              <input
                                type="text"
                                name="firstName"
                                className={`a-input-text a-input-text--2column ${
                                  isInvalidName(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                placeholder="????????????"
                                value={propsFormik.values.firstName}
                                onChange={propsFormik.handleChange}
                                onBlur={propsFormik.handleBlur}
                              />
                              <input
                                type="text"
                                name="secondName"
                                className={`a-input-text a-input-text--2column ${
                                  isInvalidName(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                placeholder="????????????"
                                value={propsFormik.values.secondName}
                                onChange={propsFormik.handleChange}
                                onBlur={propsFormik.handleBlur}
                              />
                            </div>
                            {isInvalidName(propsFormik) &&
                              propsFormik.submitCount != 0 && (
                                <span className="u-fwBold u-fz11 a-color--pink">
                                  {propsFormik.errors.firstName ||
                                    propsFormik.errors.secondName}
                                </span>
                              )}
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
                            <div className="m-table__body__2column">
                              <input
                                type="text"
                                name="firstNameFurigana"
                                className={`a-input-text a-input-text--2column ${
                                  isInvalidNameFuri(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                placeholder="??????????????????"
                                value={propsFormik.values.firstNameFurigana}
                                onChange={propsFormik.handleChange}
                                onBlur={propsFormik.handleBlur}
                              />
                              <input
                                type="text"
                                name="secondNameFurigana"
                                className={`a-input-text a-input-text--2column ${
                                  isInvalidNameFuri(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                placeholder="???????????????"
                                value={propsFormik.values.secondNameFurigana}
                                onChange={propsFormik.handleChange}
                                onBlur={propsFormik.handleBlur}
                              />
                            </div>
                            {isInvalidNameFuri(propsFormik) &&
                              propsFormik.submitCount != 0 && (
                                <span className="u-fwBold u-fz11 a-color--pink">
                                  {propsFormik.errors.firstNameFurigana ||
                                    propsFormik.errors.secondNameFurigana ||
                                    propsFormik.errors.nameFurigana}
                                </span>
                              )}
                            {/* {isInvalidNameFuri && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                ????????????????????????????????????????????????????????????
                              </span>
                            )}
                            {isInValidKatakana && !isInvalidNameFuri && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                ??????????????????????????????????????????
                              </span>
                            )} */}
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            <span className="m-table__head__label m-table__head__label--required">
                              ??????
                            </span>
                            ??????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div className="m-table__body__2column">
                              {listGender.map((gender, idx) => {
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    className={`a-button a-button--shadow3 a-button--round a-button--2column ${
                                      propsFormik.values.gender === gender.value
                                        ? 'a-button--green a-button--shadow-green-1'
                                        : 'a-button--yellow-green a-button--shadow-yellow-green-2'
                                    } ${
                                      [0, 1].includes(idx) ? 'u-mb10' : ''
                                    } u-fz16 js-gender-btn`}
                                    name="entry-gender-male"
                                    onClick={e => {
                                      propsFormik.setFieldValue(
                                        'gender',
                                        gender.value
                                      )
                                    }}
                                  >
                                    {gender.label}
                                  </button>
                                )
                              })}
                            </div>
                            {propsFormik.errors.gender &&
                              propsFormik.submitCount != 0 && (
                                <span className="u-fwBold u-fz11 a-color--pink">
                                  {propsFormik.errors.gender}
                                </span>
                              )}
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            <span className="m-table__head__label m-table__head__label--required">
                              ??????
                            </span>
                            ????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div className="m-table__body__flex-no-wrap">
                              <div className="a-input-select a-input-select--year">
                                <select
                                  className={`a-input-select__list ${
                                    isInvaildDOB(propsFormik) &&
                                    propsFormik.submitCount != 0
                                      ? 'is-required'
                                      : ''
                                  }`}
                                  name="year"
                                  value={propsFormik.values.year}
                                  onChange={propsFormik.handleChange}
                                >
                                  <option key="year-0" value="">
                                    -
                                  </option>
                                  {rangeStartToEnd(
                                    1960,
                                    new Date().getFullYear() + 1,
                                    1
                                  ).map((year, idx) => {
                                    return (
                                      <option key={idx} value={year}>
                                        {year}
                                      </option>
                                    )
                                  })}
                                </select>
                              </div>
                              <span className="a-color--green u-fwBold u-ml5 u-mr5">
                                ???
                              </span>
                              <div className="a-input-select a-input-select--month">
                                <select
                                  className={`a-input-select__list ${
                                    isInvaildDOB(propsFormik) &&
                                    propsFormik.submitCount != 0
                                      ? 'is-required'
                                      : ''
                                  }`}
                                  name="month"
                                  value={propsFormik.values.month}
                                  onChange={propsFormik.handleChange}
                                >
                                  <option key="month-0" value="">
                                    -
                                  </option>
                                  {rangeStartToEnd(1, 13, 1).map(
                                    (month, idx) => {
                                      return (
                                        <option key={idx} value={month}>
                                          {month}
                                        </option>
                                      )
                                    }
                                  )}
                                </select>
                              </div>
                              <span className="a-color--green u-fwBold u-ml5 u-mr5">
                                ???
                              </span>
                              <div className="a-input-select a-input-select--day">
                                <select
                                  className={`a-input-select__list ${
                                    isInvaildDOB(propsFormik) &&
                                    propsFormik.submitCount != 0
                                      ? 'is-required'
                                      : ''
                                  }`}
                                  name="day"
                                  value={propsFormik.values.day}
                                  onChange={propsFormik.handleChange}
                                >
                                  <option key="day-0" value="">
                                    -
                                  </option>
                                  {rangeStartToEnd(1, 32, 1).map((day, idx) => {
                                    return (
                                      <option key={idx} value={day}>
                                        {day}
                                      </option>
                                    )
                                  })}
                                </select>
                              </div>
                              <span className="a-color--green u-fwBold u-ml5">
                                ???
                              </span>
                            </div>
                            <span className="u-fz11">
                              ?????????????????????????????????????????????????????????????????????????????????????????????
                            </span>
                            <br />
                            {isInvaildDOB(propsFormik) &&
                              propsFormik.submitCount != 0 && (
                                <span className="u-fwBold u-fz11 a-color--pink">
                                  {propsFormik.errors.month ||
                                    propsFormik.errors.day ||
                                    propsFormik.errors.year ||
                                    propsFormik.errors.dob ||
                                    propsFormik.errors.dobLatest18 ||
                                    propsFormik.errors.dobScopeDay}
                                </span>
                              )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="o-entry__table">
                    <table className="m-table">
                      <tbody>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            <span className="m-table__head__label m-table__head__label--required">
                              ??????
                            </span>
                            ????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <FormPostCode
                              propsFormik={propsFormik}
                              readOnly={false}
                            />
                            {isInValidZipCode(propsFormik) && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.zipCode1 ||
                                  propsFormik.errors.zipCode2 ||
                                  propsFormik.errors.zipCode}
                              </span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            <span className="m-table__head__label m-table__head__label--required">
                              ??????
                            </span>
                            ????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div className="a-input-select a-input-select--area">
                              <select
                                value={propsFormik.values.city}
                                onChange={propsFormik.handleChange}
                                className={`a-input-select__list ${
                                  !propsFormik.values.city &&
                                  propsFormik.errors.city &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                name="city"
                              >
                                <option value="" disabled="" selected="">
                                  ?????????????????????
                                </option>
                                {listCity.map((city, idx) => {
                                  return (
                                    <option key={idx} value={city}>
                                      {city}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>
                            {!propsFormik.values.city &&
                              propsFormik.errors.city &&
                              propsFormik.submitCount != 0 && (
                                <span className="u-fwBold u-fz11 a-color--pink">
                                  {propsFormik.errors.city}
                                </span>
                              )}
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            <span className="m-table__head__label m-table__head__label--required">
                              ??????
                            </span>
                            ????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <input
                              value={propsFormik.values.ward}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                              type="text"
                              name="ward"
                              className={`a-input-text  ${
                                propsFormik.touched.ward &&
                                propsFormik.errors.ward &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              placeholder="???????????????"
                            />
                            {propsFormik.touched.ward &&
                              propsFormik.errors.ward &&
                              propsFormik.submitCount != 0 && (
                                <span className="u-fwBold u-fz11 a-color--pink">
                                  {propsFormik.errors.ward}
                                </span>
                              )}
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head">
                            <span className="m-table__head__label m-table__head__label--required">
                              ??????
                            </span>
                            ???????????????????????????
                          </th>
                          <td className="m-table__body">
                            <input
                              value={propsFormik.values.streetAddress}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                              type="text"
                              name="streetAddress"
                              className={`a-input-text  ${
                                propsFormik.touched.streetAddress &&
                                propsFormik.errors.streetAddress &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              placeholder="???????????????8-17-1"
                            />
                            {propsFormik.touched.streetAddress &&
                              propsFormik.errors.streetAddress &&
                              propsFormik.submitCount != 0 && (
                                <span className="u-fwBold u-fz11 a-color--pink">
                                  {propsFormik.errors.streetAddress}
                                </span>
                              )}
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            <span className="m-table__head__label m-table__head__label--optional">
                              ??????
                            </span>
                            ?????????????????????????????????????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <input
                              value={propsFormik.values.apartment}
                              type="text"
                              name="apartment"
                              className="a-input-text"
                              placeholder="????????????????????????????????????????????????39???"
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            <span className="m-table__head__label m-table__head__label--required">
                              ??????
                            </span>
                            ????????????
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div className="m-table__body__flex-no-wrap">
                              <input
                                type="text"
                                name="phone1"
                                value={propsFormik.values.phone1}
                                onChange={
                                  (propsFormik.values.phone1 =
                                    propsFormik.values.phone1.trim())
                                }
                                onChange={propsFormik.handleChange}
                                onBlur={propsFormik.handleBlur}
                                className={`a-input-text a-input-text--tel ${
                                  isInVaildPhone(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                              />
                              <span className="u-ml5 u-mr5 a-color--green">
                                -
                              </span>
                              <input
                                type="text"
                                name="phone2"
                                value={propsFormik.values.phone2}
                                onChange={
                                  (propsFormik.values.phone2 =
                                    propsFormik.values.phone2.trim())
                                }
                                onChange={propsFormik.handleChange}
                                onBlur={propsFormik.handleBlur}
                                className={`a-input-text a-input-text--tel ${
                                  isInVaildPhone(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                              />
                              <span className="u-ml5 u-mr5 a-color--green">
                                -
                              </span>
                              <input
                                type="text"
                                name="phone3"
                                className={`a-input-text a-input-text--tel ${
                                  isInVaildPhone(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                value={propsFormik.values.phone3}
                                onChange={
                                  (propsFormik.values.phone3 =
                                    propsFormik.values.phone3.trim())
                                }
                                onChange={propsFormik.handleChange}
                                onBlur={propsFormik.handleBlur}
                              />
                            </div>
                            <span className="u-fz11">
                              ??????????????????????????????????????????????????????????????????????????????????????????
                            </span>
                            <br></br>
                            {isInVaildPhone(propsFormik) &&
                            propsFormik.submitCount != 0 ? (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.phone1 ||
                                  propsFormik.errors.phone2 ||
                                  propsFormik.errors.phone3 ||
                                  propsFormik.errors.phoneNumber}
                              </span>
                            ) : null}
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <th
                            className="m-table__head m-table__head--entry"
                            colSpan={2}
                          >
                            <div className="o-entry__notice">
                              <ul className="m-dots-list">
                                <li>
                                  ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                </li>
                              </ul>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th
                            className="m-table__head m-table__head--entry"
                            colSpan={2}
                          >
                            <button
                              type="button"
                              style={{ width: '200px', margin: 0 }}
                              // onClick={toggle}
                              onClick={handleShippingAddress}
                              className="a-button a-button--post-btn a-button--shadow2 a-button--round a-button--yellow-green a-button--shadow-yellow-green-2 u-fz16"
                            >
                              ???????????????????????????
                            </button>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    {!isEmpty(listAddress) &&
                      listAddress.map((address, idx) => {
                        return (
                          <AddressInfo
                            invisibleDefault={true}
                            onToggle={toggle}
                            key={idx}
                            idx={idx}
                            address={{
                              ...address,
                              firstName: propsFormik.values.firstName,
                              secondName: propsFormik.values.secondName,
                              firstNameFurigana:
                                propsFormik.values.firstNameFurigana,
                              secondNameFurigana:
                                propsFormik.values.secondNameFurigana
                            }}
                          />
                        )
                      })}
                  </div>
                </div>
              </div>
              <div className="t-footer-contents">
                <div className="t-footer-contents__body">
                  <button
                    className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                    type="submit"
                    onClick={() => (window.location.href = '#')}
                    disabled={isDisableSubmit(propsFormik)}
                  >
                    ???????????????????????????
                  </button>
                </div>
              </div>
            </form>
            {/* <Modal
              isShowing={isShowing}
              hide={toggle}
              content={<ShippingAddress
                dataForm={propsFormik?.values}
                onToggle={toggle}
              />}
            /> */}
          </>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(Profile))
