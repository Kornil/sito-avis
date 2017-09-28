import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import withRouter from 'react-router-dom/withRouter';

const AdminBreadcrumbs = withRouter(props => <Breadcrumbs {...props} />);

// Breadcrumbs navigation for getting around the admin dashboard

const Breadcrumbs = (props) => {
  const { pathname } = props.location;
  let name;
  let visible = false;
  switch (pathname) {
    case '/dashboard':
      visible = true;
      break;
    case '/createblog':
      name = 'New Blog Post';
      visible = true;
      break;
    case '/createphotogallery':
      name = 'New Photo Gallery';
      visible = true;
      break;
    case '/galleryindex':
      name = 'All Galleries';
      visible = true;
      break;
    case '/updatestats':
      name = 'Update Statistics';
      visible = true;
      break;
    case '/edit/:key':
      name = 'Edit Post';
      visible = true;
      break;
    default:
      visible = false;
      break;
  }

  return (
    <div className="breadcrumbs">
      {visible &&
        <nav className="breadcrumbs__nav">
          <ul className="breadcrumbs__nav-ul">
            <li className="breadcrumbs__nav-item" >
              <NavLink
                to="/dashboard"
                className="breadcrumbs__nav-link"
                activeClassName="breadcrumbs__nav-link--active"
              >Dashboard
                </NavLink> &gt;
              </li>
            <li className="breadcrumbs__nav-item">
              <NavLink
                to={pathname}
                className="breadcrumbs__nav-link"
                activeClassName="breadcrumbs__nav-link--active"
              >{name}
              </NavLink>
            </li>
          </ul>
        </nav>
        }
    </div>
  );
};


export default AdminBreadcrumbs;
