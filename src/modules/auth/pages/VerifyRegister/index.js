import React, { memo, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { register } from '../../redux'
import pathRoutes from '../../../../helper/pathRoutes'
import paths from '../../../../helper/pathRoutes'
import { listGender } from '../../../../helper/utils'

function VerifyRegister() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { dataRegis, isRegistered, emailByToken, prmByToken, tokenByRegister } =
    useSelector(state => ({
      dataRegis: state.auth.infoRegister,
      isRegistered: state.auth.isRegistered,
      emailByToken: state.auth.emailByToken,
      prmByToken: state.auth.prmByToken,
      tokenByRegister: state.auth.tokenByRegister
    }))

  useEffect(() => {
    if (isRegistered) {
      history.push(pathRoutes.successRegister)
    }
  }, [isRegistered])

  const [isShowPassword, setIsShowPassword] = useState(false)

  const onSubmit = e => {
    // show toast

    const {
      lrvPassword,
      phone1,
      phone2,
      phone3,
      firstName,
      secondName,
      firstNameFurigana,
      secondNameFurigana,
      day,
      month,
      year,
      gender,
      city,
      ward,
      streetAddress,
      apartment,
      zipCode1,
      zipCode2
    } = dataRegis
    const phoneNumber = `${phone1}-${phone2}-${phone3}`
    const name = `${firstName} ${secondName}`
    const nameFurigana = `${firstNameFurigana} ${secondNameFurigana}`
    const dob = `${year}/${month}/${day}`
    const payload = {
      email: emailByToken ?? 'dev-anicom@gmail.com',
      lrvPassword: lrvPassword,
      token: tokenByRegister,
      memberInfo: [
        { name: 'name', value: name },
        { name: 'nameFurigana', value: nameFurigana },
        { name: 'dob', value: dob },
        { name: 'gender', value: gender },
        { name: 'city', value: city },
        { name: 'ward', value: ward },
        { name: 'streetAddress', value: streetAddress },
        { name: 'zipCode', value: `${zipCode1}-${zipCode2}` },
        { name: 'apartment', value: apartment },
        { name: 'phoneNumber', value: phoneNumber },
        { name: 'prm', value: prmByToken || '' }
      ]
    }
    dispatch(register(payload))
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">
            ?????????????????????????????????????????????????????????
          </p>
        </div>
      </div>
      <div className="m-animal-header">
        <p
          className="m-animal-header__normal-title"
          style={{ marginBottom: '20px', fontSize: '16px' }}
        >
          ?????????????????????????????????
          <br />
          ????????????????????????????????????????????????
        </p>
        <p
          className="m-animal-header__normal-title"
          style={{ fontSize: '16px' }}
        >
          ????????????????????????????????????
          <br />
          ??????????????????????????????????????????????????????
        </p>
        <div className="m-animal-header__animal-box">
          <div className="m-animal-header__animal-position">
            <img
              src="../assets/img/common/img_animals-image_register_confirm.png"
              className="m-animal-header__animal-image"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* <form id="form"> */}
      <div className="t-contents t-contents--bg-ivory">
        <div className="o-entry">
          <div className="o-entry__table o-entry__table--border-bottom">
            <table className="m-table">
              <tbody>
                {/* ?????????????????????ID????????????????????????????????????????????? */}
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    ????????????ID???????????????????????????
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__icon">
                      <p className="u-fz16">{emailByToken}</p>
                    </div>
                    <span className={`u-fz11`}>
                      ???????????????ID?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </span>
                    <br></br>
                  </td>
                </tr>

                <tr>
                  <th className="m-table__head m-table__head--entry">
                    ???????????????
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    ?????????????????????????????????
                    <div className="m-table__body__icon">
                      <input
                        value={dataRegis.lrvPassword}
                        type={`${isShowPassword ? 'text' : 'password'}`}
                        name="entry-password"
                        className={`a-input-text`}
                        style={{ display: 'none' }}
                        readOnly
                        autoFocus
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">?????????</th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__2column u-fz16">
                      {dataRegis.firstName}???{dataRegis.secondName}
                      <input
                        type="text"
                        name="entry-name-sei"
                        className={`a-input-text a-input-text--2column`}
                        value={dataRegis.firstName}
                        style={{ display: 'none' }}
                        placeholder="????????????"
                        readOnly
                      />
                      <input
                        type="text"
                        name="entry-name-mei"
                        className={`a-input-text a-input-text--2column`}
                        placeholder="????????????"
                        value={dataRegis.secondName}
                        style={{ display: 'none' }}
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    ???????????????????????????
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__2column u-fz16">
                      {dataRegis.firstNameFurigana}???
                      {dataRegis.secondNameFurigana}
                      <input
                        type="text"
                        name="entry-name-furigana-sei"
                        className={`a-input-text a-input-text--2column`}
                        placeholder="??????????????????"
                        value={dataRegis.firstNameFurigana}
                        style={{ display: 'none' }}
                        readOnly
                      />
                      <input
                        type="text"
                        name="entry-name-furigana-mei"
                        className={`a-input-text a-input-text--2column`}
                        value={dataRegis.secondNameFurigana}
                        placeholder="???????????????"
                        style={{ display: 'none' }}
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">??????</th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__2column">
                      <p
                        className="a-input-text a-input-text--2column u-fz16"
                        style={{ border: 'none', padding: 0 }}
                      >
                        {listGender.find(
                          gender => gender.value === dataRegis.gender
                        )?.label || ''}
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    ????????????
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__2column">
                      <p
                        className="a-input-text a-input-text--2column u-fz16"
                        style={{ border: 'none', padding: 0 }}
                      >
                        {dataRegis.year}???{dataRegis.month}???{dataRegis.day}???
                      </p>
                      {/* <div className="a-input-select a-input-select--year">
                        <input type="text" name="entry-name-furigana-mei"
                          className={`a-input-text a-input-text--2column`}
                          placeholder="???????????????"
                          value={dataRegis.year}
                          readOnly
                          style={{ width: '100%' },{ display: 'none'}}
                        />
                      </div>
                      <div className="a-input-select a-input-select--month">
                        <input type="text" name="entry-name-furigana-mei"
                          className={`a-input-text a-input-text--2column`}
                          placeholder="???????????????"
                          readOnly
                          value={dataRegis.month}
                          style={{ width: '100%' },{ display: 'none'}}
                        />
                      </div>
                      <span className="a-color--green u-fwBold u-ml5 u-mr5"></span>
                      <div className="a-input-select a-input-select--day">
                        <input type="text" name="entry-name-furigana-mei"
                          className={`a-input-text a-input-text--2column`}
                          placeholder="???????????????"
                          readOnly
                          value={dataRegis.day}
                          style={{ width: '100%' },{ display: 'none'}}
                        />
                      </div>
                      <span className="a-color--green u-fwBold u-ml5"></span> */}
                    </div>
                  </td>
                </tr>
                {/*</tbody></table>
          </div>
          <div className="o-entry__table">
            <table className="m-table">
              <tbody>*/}
                <tr>
                  <th className="m-table__head m-table__head--entry">??????</th>
                  <td className="m-table__body m-table__body--entry">
                    <div
                      className="m-table__body__flex-no-wrap"
                      style={{ alignItems: 'unset', flexDirection: 'column' }}
                    >
                      <div
                        className="a-input-text--3column"
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <p
                          className="a-input-text a-input-text--3column u-fz16"
                          style={{ border: 'none', padding: 0 }}
                        >
                          ???{dataRegis.zipCode1} - {dataRegis.zipCode2}
                          <br />
                          {dataRegis.city}
                          {dataRegis.ward}
                          {dataRegis.streetAddress}
                          {dataRegis.apartment}
                        </p>
                        <input
                          type="text"
                          name="entry-post-1"
                          className={`a-input-text a-input-text--post p-postal-code`}
                          size="3"
                          maxlength="3"
                          style={{ display: 'none' }}
                          readOnly
                          value={dataRegis.zipCode1}
                        />
                        <input
                          type="text"
                          name="entry-post-2"
                          className={`a-input-text a-input-text--post p-postal-code`}
                          size="4"
                          maxlength="4"
                          style={{ display: 'none' }}
                          readOnly
                          value={dataRegis.zipCode2}
                        />
                      </div>
                    </div>
                    {/* city */}
                    <div
                      className="m-table__body__flex-no-wrap"
                      style={{
                        alignItems: 'unset',
                        flexDirection: 'column',
                        marginTop: 0
                      }}
                    >
                      <div
                        className="a-input-text a-input-text--2column"
                        style={{
                          border: 'none',
                          padding: 0,
                          marginBottom: 0,
                          fontWeight: 'bold',
                          display: 'none'
                        }}
                      >
                        ????????????
                      </div>
                      <div
                        className="a-input-text--2column"
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <p
                          className="a-input-text a-input-text--2column"
                          style={{ border: 'none', padding: 0 }}
                        ></p>
                        <input
                          type="text"
                          name="entry-post-1"
                          className={`a-input-text a-input-text--post p-postal-code`}
                          style={({ width: '80%' }, { display: 'none' })}
                          placeholder="????????????"
                          readOnly
                          value={dataRegis.city}
                        />
                      </div>
                    </div>
                    {/* ward */}
                    <div
                      className="m-table__body__flex-no-wrap"
                      style={{
                        alignItems: 'unset',
                        flexDirection: 'column',
                        marginTop: 0
                      }}
                    >
                      <div
                        className="a-input-text a-input-text--2column"
                        style={{
                          border: 'none',
                          padding: 0,
                          marginBottom: 0,
                          fontWeight: 'bold',
                          display: 'none'
                        }}
                      >
                        ????????????
                      </div>
                      <div
                        className="a-input-text--2column"
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <p
                          className="a-input-text a-input-text--2column"
                          style={{ border: 'none', padding: 0 }}
                        ></p>
                        <input
                          type="text"
                          name="entry-post-1"
                          className={`a-input-text a-input-text--post p-postal-code`}
                          style={({ width: '100%' }, { display: 'none' })}
                          readOnly
                          placeholder="????????????"
                          value={dataRegis.ward}
                        />
                      </div>
                    </div>
                    {/* streetAddress */}
                    <div
                      className="m-table__body__flex-no-wrap"
                      style={{
                        alignItems: 'unset',
                        flexDirection: 'column',
                        marginTop: 0
                      }}
                    >
                      <div
                        className="a-input-text a-input-text--2column"
                        style={{
                          border: 'none',
                          padding: 0,
                          marginBottom: 0,
                          fontWeight: 'bold',
                          display: 'none'
                        }}
                      >
                        ???????????????????????????
                      </div>
                      <div
                        className="a-input-text--2column"
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <p
                          className="a-input-text a-input-text--2column"
                          style={{ border: 'none', padding: 0 }}
                        ></p>
                        <input
                          type="text"
                          name="entry-post-1"
                          className={`a-input-text a-input-text--post p-postal-code`}
                          size="3"
                          maxlength="3"
                          style={{ width: '100%', display: 'none' }}
                          readOnly
                          placeholder="???????????????????????????"
                          value={dataRegis.streetAddress}
                        />
                      </div>
                    </div>
                    {/* appartment */}
                    <div
                      className="m-table__body__flex-no-wrap"
                      style={{
                        alignItems: 'unset',
                        flexDirection: 'column',
                        marginTop: 0
                      }}
                    >
                      <div
                        className="a-input-text a-input-text--2column"
                        style={{
                          border: 'none',
                          padding: 0,
                          marginBottom: 0,
                          fontWeight: 'bold',
                          display: 'none'
                        }}
                      >
                        ?????????????????????????????????????????????
                      </div>
                      <div
                        className="a-input-text--column"
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <p
                          className="a-input-text a-input-text--2column"
                          style={{ border: 'none', padding: 0 }}
                        ></p>
                        <input
                          type="text"
                          name="entry-post-1"
                          placeholder="?????????????????????????????????????????????"
                          className={`a-input-text a-input-text--post p-postal-code`}
                          readOnly
                          style={{ width: '100%', display: 'none' }}
                          value={dataRegis.apartment}
                        />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th className="m-table__head m-table__head--entry">
                    ????????????
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__flex-no-wrap">
                      <p
                        className="a-input-text a-input-text--2column u-fz16"
                        style={{ border: 'none', padding: 0 }}
                      >
                        {dataRegis.phone1}-{dataRegis.phone2}-{dataRegis.phone3}
                      </p>
                      <input
                        type="text"
                        name="entry-tel-1"
                        className={`a-input-text a-input-text--tel`}
                        readOnly
                        style={{ display: 'none' }}
                        value={dataRegis.phone1}
                      />
                      <input
                        type="text"
                        name="entry-tel-2"
                        className={`a-input-text a-input-text--tel`}
                        readOnly
                        style={{ display: 'none' }}
                        value={dataRegis.phone2}
                      />
                      <input
                        type="text"
                        name="entry-tel-3"
                        className={`a-input-text a-input-text--tel`}
                        readOnly
                        style={{ display: 'none' }}
                        value={dataRegis.phone3}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    ???????????????????????????????????????????????????
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__flex-no-wrap">
                      <p
                        className="a-input-text a-input-text--2column u-fz16"
                        style={{ border: 'none', padding: 0 }}
                      >
                        ???????????????
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="t-footer-contents">
        <div
          className="t-footer-contents__body"
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <button
            className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
            style={{
              width: '200px',
              margin: 'unset',
              marginRight: '2px',
              backgroundColor: '#808080',
              boxShadow: '0 2px 0 0 #626262'
            }}
            onClick={e => {
              history.push(
                `${pathRoutes.entry}${
                  tokenByRegister && `?token=${tokenByRegister}`
                }?return=true`
              )
            }}
          >
            ??????
          </button>
          <button
            onClick={onSubmit}
            style={{ width: '200px', margin: 'unset', marginLeft: '2px' }}
            className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
          >
            ??????
          </button>
        </div>
      </div>
      {/* </form> */}
    </div>
  )
}

export default memo(VerifyRegister)
