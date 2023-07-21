/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import AddCourse from "./AddCourse";
import { getUsers } from "../../redux/user/userActions";

export const UsersList = ({ ...props }) => {
  useEffect(() => {
    props.AllUsers();
  }, []);

  return (
    <div className="row">
      <h3 className="yellow-text">Users Management</h3>
      <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <AddCourse />
      </div>

      <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
        {!props.isLoading ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col blue-text">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
          </table>
        ) : (
          <div className="text-center mt-5">
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  isLoading: state.user.loading,
});

const mapActionToProps = {
  AllUsers: getUsers,
};

export default connect(mapStateToProps, mapActionToProps)(UsersList);
