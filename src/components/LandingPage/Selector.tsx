import React from 'react'

function Selector() {
  return (
    <div className="container">
        <div className="Selector__options">
          <button className="Selector__button btn btn-primary">Domestic</button>
          <button className="Selector__button btn btn-primary">International</button>
          <button className="Selector__button btn btn-primary">Storage</button>
        </div>
        <div className="Selector__instructions row">
          <div className="col-12 col-md-9">
            <h4>Looking for long distance moving services?</h4>
            <p>For long distance & international services, we will need to collect your info & one of our specialists will be in touch.</p>
          </div>
          <div className="col-12 col-md-3">
            <button className='button button-secondary'>Get started</button>
          </div>
        </div>
    </div>
  )
}

export default Selector;
