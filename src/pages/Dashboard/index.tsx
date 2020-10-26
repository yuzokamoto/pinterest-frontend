import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  })
);

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [pins, setPins] = useState([]) as any;

  useEffect(() => {
    getPins();
  }, []); // eslint-disable-line

  const classes = useStyles();

  async function getPins() {
    try {
      const response = await api.get("/pin");
      setPins(response.data.result);
    } catch (error) {
      console.log(error.response);
      setPins([]);
    }
  }

  async function handleLogout() {
    logout();
  }

  return (
    <div>
      <Header />
      <h3>Dashboard Page</h3>
      <h4>{user && user.name}</h4>
      <button onClick={handleLogout}>Logout</button>
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {pins.map((pin: any) => (
            <GridListTile key={pin.id} cols={1}>
              <img src={pin.file} alt={pin.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

export default Dashboard;
