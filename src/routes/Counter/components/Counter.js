import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './counter.scss'

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      code:'',
      name:'',
      count:1
    }
  }
//for api calling
  componentWillMount() {
    this.props.doubleAsync();
  }

  addItemByIndex(toppings,code, name, action) {
    const default_toppings=[ 'Bf','Be','Cb','Bj','Ca','Bg','Ax','Bz'];
    let final_toppings = [];
    console.log(default_toppings.indexOf(code));
    default_toppings.map((item) => {

      // checking topping is inside default_toppings or not
      // if yes then increment the count

      if (final_toppings.length <= 11) {

      //total toppings should not be greater than 11

        if (item === code) {
          this.state.code = code;
          this.state.name = name;
          console.log(this.state.code);
          console.log(this.state.name);
          if (action === 'add') {

            //if  count is less than 3 than add otherwise show alert message.

            if (this.state.count >= 3) {
              alert('topping count must be less than 3')
            } 
            else {
              this.state.count = this.state.count + 1;
              //final_toppings.push(this.state);
              localStorage.setItem("final_toppings",this.state);
            }
          }
          else if (action === 'remove' && this.state.count > 0) {
            this.state.count = this.state.count - 1;
            //final_toppings.push(this.state);
            localStorage.getItem("final_toppings",this.state);
          }
        } 
      }
      else {
        alert('total toppings must be less than 11');
      }
    })
    console.log(this.state);
    console.log(final_toppings);
    console.log('============================ toppings is', toppings);
    console.log('============================ code is ', code);
    console.log('============================ name is ', name);
    console.log('============================ action is ', action);
  }

  render() {
    return (
      <div style={{ margin: '0 auto' }} >
        { (!_.isEmpty(this.props.toppings))  && 
          this.props.toppings.map((item, index)=>{
            return(
              <div className="image" key={index}>
                <img src={item.image} height="60"/>
                <button className="dbtn" height="40" onClick={() =>this.addItemByIndex(this.props.toppings,item.opt_code, item.opt_name_en, 'add')}>+</button>
                <button className="dbtn" height="40" onClick={() =>this.addItemByIndex(this.props.toppings,item.opt_code, item.opt_name_en, 'remove')}>-</button>
              </div>
            );
          })
        }
      </div>
    );
  };

static propTypes = {
  doubleAsync: PropTypes.func.isRequired,
}

}
export default Counter
