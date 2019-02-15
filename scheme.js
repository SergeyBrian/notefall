const SCHEME_INPUT = document.getElementById("scheme");
SCHEME_INPUT.onchange = function () {
  current_scheme = schemes.indexOf(SCHEME_INPUT.value);
};