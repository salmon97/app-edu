import React, {Component} from 'react';
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/all";
import router from "umi/router";
import {connect} from "dva";

@connect(({registerModel})=>({registerModel}))
class CheckRegister extends Component {

  render() {
    const {dispatch,registerModel}=this.props;
    const checkCode=()=>{
      let code = document.getElementById("code").value;
      dispatch({
        type:'registerModel/checkCode',
        payload:code
      });
      dispatch({
        type:'registerModel/updateState',
        payload:{
          code:code
        }
      })
    };
    return (
      <div className="container check-reg">
        <div className="row">
          <div className="col-md-6  col-input offset-3">
            <h4>enter code which given by education center </h4>
            <input type="password" id="code" className="input-code" placeholder="enter given code by education center"/>
            <br/>
            <button className="button-b" onClick={function () {router.push("auth/login")}}><BsArrowLeftShort className="btn-icon"/>log in</button>
            <button className="button-b" onClick={checkCode}>next<BsArrowRightShort className="btn-icon"/></button>
          </div>
        </div>
      </div>
    );
  }
}

CheckRegister.propTypes = {};

export default CheckRegister;
