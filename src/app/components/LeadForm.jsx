import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwbd_NSDKHZYN70TsQwDD3uzQYaiHy1CVlTKEfBSqieD347NnV6jUw4iNVbj9uFRC1vZQ/exec";

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Message", message);

    const toastId = toast.loading("Sending...");
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // console.log("Success!", response);
        setName("");
        setPhone("");
        setMessage("");
        toast.success("Sent Successfully");
      } else {
        toast.error("Failed to send!");
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error!", error.message);
    }
    toast.dismiss(toastId);
  };
  return (
    <div className="rounded-4xl w-[calc(100vw-20px)] mx-auto sm:w-fit py-10 px-8 sm:p-10 bg-[#191919]">
      <p className="text-white w-full xxs2:text-lg sm:text-2xl font-montserrat-medium sm:w-[550px]">
        Create. Market. Grow — With Unico Studios
      </p>
      <form
        name="submit-to-google-sheet"
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-5 mt-7 sm:mt-10 font-montserrat-regular text-white relative"
      >
        <input
          required
          type="text"
          placeholder="Name"
          className="border-gray-300 border w-full sm:w-[550px] text-sm sm:text-base outline-none backdrop-blur-[30px] py-3 sm:py-3.5 pl-4 sm:pl-5 pr-3 sm:pr-3.5 rounded-lg sm:rounded-xl placeholder:text-gray-300"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Phone No."
          className="border-gray-300 border w-full sm:w-[550px] text-sm sm:text-base outline-none backdrop-blur-[30px] py-3 sm:py-3.5 pl-4 sm:pl-5 pr-3 sm:pr-3.5 rounded-lg sm:rounded-xl placeholder:text-gray-300"
          name="Email"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          required
          placeholder="Message"
          className="border-gray-300 border w-full sm:w-[550px] text-sm sm:text-base outline-none backdrop-blur-[30px] py-3 sm:py-3.5 pl-4 sm:pl-5 pr-3 sm:pr-3.5 rounded-lg sm:rounded-xl placeholder:text-gray-300 resize-none"
          rows={5}
          value={message}
          name="Contact"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#5F14E0] text-white absolute bottom-2 sm:bottom-3 right-[3%] sm:right-5 flex items-center gap-5 sm:gap-6 p-1 rounded-full cursor-pointer"
        >
          <span className="ml-2 sm:ml-3 text-sm font-montserrat-medium sm:text-base">
            {" "}
            Send{" "}
          </span>
          <IoArrowForwardCircleOutline
            className="text-2xl sm:text-3xl"
            style={{ transform: `rotate(-30deg)` }}
          />
        </button>
      </form>
    </div>
  );
}
