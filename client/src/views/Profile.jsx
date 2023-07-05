import React from "react";
import { Card, Layout } from "antd";
import Footer from "../components/Footer";
const { Content } = Layout;

export const Profile = ({ ...props }) => {
  return (
    <>
      <Content className="container-fluid">
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 align">
              <Card>
                <h2 className="montserrat_bold">Evening class</h2>
                <div className="parag_style">
                  <p>
                    If you are a working professional or simply have other
                    commitments during the day, these evening courses are for
                    you.
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 align"></div>
          </div>
        </div>
      </Content>
      <Footer />
    </>
  );
};

export default Profile;
