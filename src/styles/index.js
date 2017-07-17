
const styled = require('styled-components').default;

const BootStrapBtn = exports.BootStrapBtn = `
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
`;

const BootStrapBtnDefault = exports.BootStrapBtnDefault = `
    color: #333;
    background-color: #fff;
    border-color: #ccc;
`;

module.exports = {

    CenteredContainer: styled.div`
      text-align: center;
    `,
    Button: styled.button`
        ${BootStrapBtn}
        ${BootStrapBtnDefault}
    `
};
