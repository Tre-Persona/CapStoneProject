import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Contact from '../Contact'

Enzyme.configure({ adapter: new Adapter() })

it('About renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Contact />, div)
  })