function checkField(e) {
  event.preventDefault();
  form = document.getElementById("entryform");

  // Number of Children field validation
  //
  // validation fails if the input is blank
  if (form.child.value == "") {
    //alert("Error: Input is empty!");
    document.getElementById("ChildMessage").innerHTML =
      "Please enter the number of children in your household";
    form.child.focus();
    return false;
  }
  document.getElementById("ChildMessage").innerHTML = "";
  // regular expression to match only alphanumeric characters and spaces
  var re = /^[\d ]+$/;

  // validation fails if the input doesn't match our regular expression
  if (!re.test(form.child.value)) {
    document.getElementById("ChildMessage").innerHTML =
      "This field must be a number";
    form.child.focus();
    return false;
  }
  document.getElementById("ChildMessage").innerHTML = "";

  // Adjusted Gross Income field validation

  if (form.agi.value == "") {
    //alert("Error: Input is empty!");
    document.getElementById("AGIMessage").innerHTML =
      "Please enter a dollar amount";
    form.agi.focus();
    return false;
  }
  document.getElementById("AGIMessage").innerHTML = "";
  // regular expression to match only alphanumeric characters and spaces
  var re = /^[\d|\$|\,|\.]+$/;

  // validation fails if the input doesn't match our regular expression
  if (!re.test(form.agi.value)) {
    document.getElementById("AGIMessage").innerHTML =
      "This field must be a number";
    form.agi.focus();
    return false;
  }
  document.getElementById("AGIMessage").innerHTML = "";

  // validation was successful

  var form = document.getElementById("entryform");
  if (document.getElementById("single").checked) {
    agiValue = 75000;
  } else if (document.getElementById("widow").checked) {
    agiValue = 75000;
  } else if (document.getElementById("married").checked) {
    agiValue = 150000;
  } else if (document.getElementById("separate").checked) {
    agiValue = 75000;
  } else if (document.getElementById("head").checked) {
    agiValue = 112500;
  }

  check = calcCheck(
    agiValue,
    form.child.value,
    Math.round(form.agi.value.replace(/\$|,/g, ""))
  );

  document.getElementById("textresults").innerHTML =
    "Your estimated second stimulus check will be " +
    formatter.format(check.toFixed(0));

  return true;
}

function clearForm() {
  document.getElementById("textresults").innerHTML = "";
}

function calcCheck(base, child, agi) {
  if (base == 150000) {
    var val = 1200;
  } else {
    var val = 600;
  }
  //alert(val+(child * 500)+" "+((agi-base) * .05));
  var reduct = (agi - base) * 0.05;
  if (reduct < 0) {
    reduct = 0;
  }
  var check = val + child * 600 - reduct;
  if (check <= 0) {
    check = 0;
  }
  return check;
}

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
