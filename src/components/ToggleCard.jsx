import React, { Component } from 'react';

import { sanitize, resize, cardWidth } from '../utils/';

class ToggleCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggleCard = this.toggleCard.bind(this);
  }

  toggleCard() {
    // toggle faq card open and shut
    let open = this.state.open;
    open = !open;
    this.setState({ open });
  }

  render() {
    return (
      <div>
        <button
          className={this.state.open ? 'fa fa-chevron-circle-up faq__toggle--open' : 'fa fa-chevron-circle-down faq__toggle'}
          onClick={() => this.toggleCard()}
          aria-label={this.state.open ? 'Close' : 'Open'}
        />
        <h3 className="faq__title">{this.props.title}</h3>
        {this.state.open &&
        <div className="faq__content">
          <div className="imgCont">
            {this.props.images && this.props.images.featured &&
            <img
              className="faq__img"
              src={resize(cardWidth, this.props.images.featured.url)}
              alt={this.props.images.featured.alt}
            />}
          </div>
          <div className="faq__body" dangerouslySetInnerHTML={sanitize(this.props.body)} />
        </div> }
      </div>
    );
  }
}


export default ToggleCard;
