const CreateBrowserHistory = require('history/lib/createBrowserHistory');
const UseRouterHistory = require('react-router').useRouterHistory;

module.exports = UseRouterHistory(CreateBrowserHistory)({
    basename: __BASENAME__
});
