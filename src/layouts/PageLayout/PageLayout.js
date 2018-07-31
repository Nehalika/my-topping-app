import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='header'>
    <h1>Pizza Toppings</h1>
    <button className='save'>Save</button>
      <div className='page-layout__viewport '>
        {children}
      </div>
    <hr/>
    <h1>Cart</h1>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout

