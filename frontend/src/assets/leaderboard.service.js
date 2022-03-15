import axios from 'axios';

const API_URL = '/api/leaderboard';

class LeaderboardService {
  getLeaderboard() {
    return axios.get(API_URL);
  }

  postScore(username, score) {
    axios.post(API_URL, {
      username,
      score
    });
  }
}

export default new LeaderboardService();
