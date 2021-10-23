function emailValidator () {
  return function email (value) {
    return (value && !!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) || 'Please enter a valid email';
  };
}
function noSpaceValidator () {
  return function noSpace (value) {
    return ((value && !value.match(" ")) || !value) || 'Do not use spaces';
  };
}

function noEnterValidator () {
  return function noEnter (value) {
    return ((value && !value.match("\n")) || !value) || 'Do not use enters';
  };
}

function requiredValidator () {
  return function required (value) {
    return (value !== undefined && value !== null && value !== '') || 'This field is required';
  };
}

export {
  emailValidator,
  requiredValidator,
  noSpaceValidator,
  noEnterValidator
};
