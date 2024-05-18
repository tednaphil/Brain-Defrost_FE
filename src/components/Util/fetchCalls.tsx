import type { CreateGameRequest } from "./interfaces";

const getGame = async () => {
  try {
    const response = await fetch(
      "https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1"
      // "https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1"
      //if we use this request, let's make sure we update it to be dynamically invoked
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get game - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - game", error);
    throw error;
  }
};
const getPlayer = async () => {
  try {
    const response = await fetch(
      "https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1/players/1"
      // "https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1/players/1"
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get player - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - get player", error);
    throw error;
  }
};
const getStats = async (gameID: string) => {
  try {
    const response = await fetch(
      "https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1/stats"
      // `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/stats`
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get stats - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - stats", error);
    throw error;
  }
};

const postPlayer = async (gameID: string | undefined, displayName: string) => {
  try {
    const response = await fetch(
      `https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/${gameID}/players`,
      // `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/players`,
      {
        method: "POST",
        body: JSON.stringify({
          display_name: displayName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't create player - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - create player", error);
    throw error;
  }
};
const postGame = async (formData: CreateGameRequest) => {
  try {
    const response = await fetch(
      "https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/",
      // "https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't create game - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - create game", error);
    throw error;
  }
};
const patchPlayer = async (gameID: string/*, playerID: string*/) => {
  try {
    const response = await fetch(
      `https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/${gameID}/players/1`,
      // `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameid}/players/${playerID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't update player - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - patch player", error);
    throw error;
  }
};

const getAllPlayers = async (gameID: string | undefined) => {
  try {
    const response = await fetch(
      `https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1/players`,
      // `https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/${gameID}/players`,
      { method: "GET" }
    );
    if (!response.ok) {
      const status = response.status;
      console.log(status);
      throw new Error(`Couldn't get players - ${status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    console.log("API CALLS catch block - patch player", error);
    throw error;
  }
};

export { getGame, getPlayer, getStats, postPlayer, postGame, patchPlayer, getAllPlayers};
