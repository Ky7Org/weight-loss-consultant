export const contains = (role, currentRole) => {
  console.log('CurrentRole: ' + currentRole);
  var result = false;
  if (currentRole?.includes(role) === true) {
    result = true;
  }
  console.log('Current Roles:' + currentRole);
  return result;
};

export const transformToSelections = (data) => {
  if (!data) return null;
  if (Array.isArray(data) && !data.length) return null;

  if (Array.isArray(data)) {
    return data.map((item) => toSelection(item));
  }

  return [toSelection(data)];
};

const toSelection = (data) => {
  if (data?.user) {
    return { value: data.user?.id, label: data.user?.email };
  }

  return { value: data?.id, label: data?.name };
};
