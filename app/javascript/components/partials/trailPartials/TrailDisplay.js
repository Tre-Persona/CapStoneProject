import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import TrailProfileDefault from "../images/trail-image-profile-default.jpg";
import { NavLink } from "react-router-dom";

const TrailDisplay = (props) => {
  const { currentTrail, favorited, handleFavorite } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="trail-profile-wrapper">
        {currentTrail.name !== undefined && (
          <>
            <div className="trail-profile-image-wrapper">
              {currentTrail.imgMedium === "" && (
                <img
                  alt={`Image of ${currentTrail.name}.`}
                  className="trail-profile-image"
                  src={TrailProfileDefault}
                />
              )}
              {currentTrail.imgMedium !== "" && (
                <img
                  alt={`Image of ${currentTrail.name}.`}
                  className="trail-profile-image"
                  src={currentTrail.imgMedium}
                />
              )}
              {props.logged_in && (
                <Button
                  className="trail-profile-favorite-button"
                  style={{
                    backgroundColor: favorited ? "#1ba274" : "gray",
                    border: "3px solid white",
                  }}
                  onClick={() => handleFavorite()}
                >
                  {favorited && "Favorited"}
                  {!favorited && "Favorite"}
                </Button>
              )}
            </div>

            <div className="trail-profile-body">
              <h4 className="trail-profile-title">{currentTrail.name}</h4>

              <div className="trail-profile-subtitle-wrapper">
                <p className="trail-profile-location">
                  {currentTrail.location}
                </p>
                {typeof currentTrail.length === "number" && (
                  <p className="trail-profile-length">
                    {currentTrail.length} mi long
                  </p>
                )}
              </div>

              <div className="trail-profile-counts-wrapper">
                <p className="trail-profile-count">
                  Comments({props.commentCount}),
                </p>
                <p className="trail-profile-count">
                  Contributions({props.formCount})
                </p>
              </div>

              <div className="trail-profile-badges-wrapper">
                {props.trailBadges.map((badge, index) => {
                  return (
                    <div className="trail-profile-badge-box" key={index}>
                      <img
                        src={badge.badge}
                        className="trail-profile-badge-image"
                      />
                      <label className="trail-profile-badge-label">
                        {badge.label}
                      </label>
                    </div>
                  );
                })}
              </div>

              <p className="trail-profile-text">{currentTrail.summary}</p>

              {props.logged_in && (
                <div className="trails-profile-questionnaire-wrapper">
                  <div style={{ display: "flex" }}>
                    <NavLink
                      to={`/trails/${props.params_id}/questionnaire`}
                      render
                    >
                      <Button className="trail-profile-questionnaire-button">
                        Contribute Trail Information
                      </Button>
                    </NavLink>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p
                      onClick={toggle}
                      className="trail-profile-questionnaire-label"
                    >
                      Why contribute information to a trail?
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Modal
              className="trail-profile-modal"
              isOpen={modal}
              toggle={toggle}
            >
              <ModalBody>
                <strong>
                  Make the outdoors more accessible to others by contributing
                  what you know!
                </strong>
                <br />
                <br />
                Please contribute information about a trail to help people with
                accessibility issues gain more knowledge about the trails that
                is otherwise not provided on other sites.
                <br />
                <br />
                Since every person is different, we can't tell you how difficult
                a trail may be for you, but we aim to gather enough information
                about a trail to help you make an informed decision.
              </ModalBody>
              <ModalFooter>
                <Button className="trail-profile-modal-button" onClick={toggle}>
                  Got it!
                </Button>{" "}
              </ModalFooter>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default TrailDisplay;
