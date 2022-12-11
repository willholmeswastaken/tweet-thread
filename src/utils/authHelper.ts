const jwtParse = ({
  token,
  user,
  account = {},
  profile = {},
  isNewUser,
}: any) => {
  // We want to return a token which containts an object called
  // provider (eg Twitter), along with the access_token and
  // the refresh_token.

  if (account.provider && !token[account.provider]) {
    token[account.provider] = {};
  }

  if (account.access_token) {
    token[account.provider].access_token = account.access_token;
  }

  if (account.refresh_token) {
    token[account.provider].refresh_token = account.refresh_token;
  }

  if (profile.data && profile.data.id) {
    token[account.provider].id = profile.data.id;
  }

  return token;
};

export default jwtParse;
