import React from "react";
import { RouteComponentProps } from "react-router-dom";


interface MatchParams {
  touristRouteId: string;
}

const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
//   console.log(props.history);
//   console.log(props.location);
//   console.log(props.match);
  return <h1>旅遊路線詳情頁面, 路線ID: {props.match.params.touristRouteId}</h1>;
};

export { DetailPage }
