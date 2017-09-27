import React from 'react';
import { withRouter } from 'react-router';

// default react router behavior maintains scroll position on route change
// this forces scroll to top on route change

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
