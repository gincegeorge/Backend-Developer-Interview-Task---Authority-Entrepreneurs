import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [contact, setContact] = useState(null);
  const [customField, setCustomField] = useState(null);

  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkpOVEpTV04ya0tkRVZkMElFbEZhIiwiY29tcGFueV9pZCI6ImJmb1Q3MkNWcm9oMlg4ZWZPUmdRIiwidmVyc2lvbiI6MSwiaWF0IjoxNjYxNDE2NzQzNTcxLCJzdWIiOiJQcVJEWDZqMjdXempXRUNsQm92eCJ9.u6WPtyudfB9R4nLnLbBZ6i9KquDeK6WnIOZxKAeE9Hg",
    },
  };
  const baseUrl = "https://rest.gohighlevel.com/v1";

  useEffect(() => {
    getContact();
    getCustomField();
  }, []);

  const getContact = async () => {
    axios
      .get(`${baseUrl}/contacts`, config)
      .then((response) => {
        setContact(response.data.contacts[0]);
      })
      .catch((err) => console.log(err));
  };

  const getCustomField = async () => {
    axios
      .get(`${baseUrl}/custom-fields`, config)
      .then((response) => {
        const filteredCustomFields = response.data.customFields.filter(
          (item) => item.name === "DFS Booking Zoom Link"
        );
        setCustomField(filteredCustomFields[0]);
      })
      .catch((err) => console.log(err));
  };

  console.log(contact);
  console.log(customField);

  return (
    <>
      <div className="max-w-5xl mx-auto pt-20">
        <h1 className="text-2xl font-bold mb-10 text-center">Edit contact</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  DFS booking zoom link
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contact ? (
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {contact.contactName}
                  </th>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{customField.name}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ) : (
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    ----------
                  </th>
                  <td className="px-6 py-4">------- --</td>
                  <td className="px-6 py-4">TEST</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
