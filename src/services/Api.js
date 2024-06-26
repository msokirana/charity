const BASE_URL = "http://20.197.14.90:8000"; // Replace this with your API base URL

// const BASE_URL =  "http://loancharity.winlinetech.com"

// http://20.197.14.90/admin/account/account/

// Function to handle GET requests
export const get = async (url) => {
  let headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  const response = await fetch(`${BASE_URL}${url}`, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

// Function to handle POST requests
export const post = async (url, data) => {
  let headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to post data to ${url}`);
  }
  return response.json();
};

export const postFile = async (url, formdata) => {
  const myHeaders = new Headers();

  const token = localStorage.getItem("token");
  if (token) {
    myHeaders.append("Authorization", `Token ${token}`);
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(`${BASE_URL}${url}`, requestOptions);
  if (!response.ok) {
    throw new Error(`Failed to post data to ${url}`);
  }
  return response.json();
};

// Function to handle PUT requests
export const put = async (url, data) => {
  let headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to post data to ${url}`);
  }
  return response.json();
};

// Function to handle DELETE requests
export const remove = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete data at ${url}`);
  }
  return response.json();
};
