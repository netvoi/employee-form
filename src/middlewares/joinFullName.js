export default function (ob) {
  const employee = { ...ob };

  let fullName = `${employee.lastName} ${employee.firstName}`;
  if (employee.middleName) {
    fullName += ` ${employee.middleName}`;
    delete employee.middleName;
  }

  employee.fullName = fullName;
  delete employee.firstName;
  delete employee.lastName;

  return employee;
}
