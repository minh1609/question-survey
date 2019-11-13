import React from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, withRouter } from "react-router-dom";

let TransitionWrapper = ({ children, location }) => {
  return (
    <div>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 500, exit: 500 }}
          classNames="fade"
        >
          <section className="route-section">
            <Switch location={location}>{children}</Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default withRouter(TransitionWrapper);
