export default function (ob) {
  const employee = { ...ob };

  const [lastName, firstName, middleName] = [...employee.fullName.split(' ', 3)];
  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.middleName = middleName;

  delete employee.fullName;

  return employee;
}
