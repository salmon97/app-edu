import React, {Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "dva";
import RegisterAll from "../../../components/RegisterAll";

@connect(({registerModel, globalModel}) => ({registerModel, globalModel}))
class Register extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'globalModel/getRegions'
    })
  }

  // state = {
  //   startDate: new Date(),
  // };
  //
  // handleChange = date => {
  //   this.setState({startDate: date});
  // };


  render() {
    const {dispatch, registerModel, globalModel} = this.props;
    const {regions, districts, isDirector, isStaff,which} = globalModel;
    const {code} = registerModel;

    const getRegionId = (e) => {
      dispatch({
        type: 'globalModel/getDistricts',
        payload: {id: e.target.value}
      })
    };

    const register = (e, v) => {
      const reqContact = {
        address: v.address,
        email: v.email,
        districtId: v.districtId,
        phoneNumbers: [v.phoneNumbers]
      };
      if (isDirector || isStaff) {
        dispatch({
          type: 'registerModel/regStaffAndTeacher',
          payload: {which, ...v, reqContact}
        })
      } else {
        dispatch({
          type: 'registerModel/register',
          payload: {admissionCode: code, ...v, reqContact}
        })
      }
    };

    return (
      <div>
        <RegisterAll
          isDirector={isDirector}
          isStaff={isStaff}
          register={register}
          getRegionId={getRegionId}
          regions={regions}
          districts={districts}
        />
      </div>
    );
  }
}

Register.propTypes = {};

export default Register;
