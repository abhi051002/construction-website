import React, { useState, useRef, useMemo } from "react";
import Sidebar from "../../Sidebar";
import { ArrowLeftCircle, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGetToken from "../../../hooks/useGetToken";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [content, setContent] = useState("");
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Content",
    }),
    [placeholder]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { token } = useGetToken();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const newData = { ...data, content: content, imageId: imageId };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/services`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        navigate("/admin/services");
      } else {
        toast.error(responseData.error.slug[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/temp-images`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == false) {
          toast.error(result.error.image[0]);
        } else {
          setImageId(result.data.id);
        }
      });
  };
  return (
    <main className="dashboard-container bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            {/* Sidebar */}
            <Sidebar activePage="services" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <h4 className="h-5 d-flex">
                    <Briefcase size={28} className="me-2" />
                    {`Services > Create`}
                  </h4>
                  <Link to="/admin/services" className="btn btn-primary d-flex">
                    <ArrowLeftCircle className="me-2" />
                    Back
                  </Link>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      placeholder="Enter name"
                      {...register("title", {
                        required: "This title field is required",
                      })}
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors?.title?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Slug
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.slug ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Slug"
                      {...register("slug", {
                        required: "This slug field is required",
                      })}
                    />
                    {errors.slug && (
                      <p className="invalid-feedback">
                        {errors?.slug?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      placeholder="Short Desciption"
                      className="form-control"
                      {...register("short_desc")}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Content
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select className="form-control" {...register("status")}>
                      <option value="1">Active</option>
                      <option value="0">Block</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <br />
                    <input type="file" onChange={handleFile} />
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    disabled={isDisable}
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Create;
