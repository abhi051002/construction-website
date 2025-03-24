import React, { useState, useRef, useMemo } from "react";
import Sidebar from "../../Sidebar";
import { ArrowLeftCircle, Briefcase, FolderOpen } from "lucide-react";
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
        `${import.meta.env.VITE_BACKEND_URL}/projects`,
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
        navigate("/admin/projects");
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
            <Sidebar activePage="projects" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <h4 className="h-5 d-flex">
                    <FolderOpen size={28} className="me-2" />
                    {`Projects > Create`}
                  </h4>
                  <Link to="/admin/projects" className="btn btn-primary d-flex">
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Location
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.location ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Location"
                          {...register("location", {
                            required: "This location field is required",
                          })}
                        />
                        {errors.location && (
                          <p className="invalid-feedback">
                            {errors?.location?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Construction Type
                        </label>
                        <select
                          className={`form-control ${
                            errors.construction_type ? "is-invalid" : ""
                          }`}
                          {...register("construction_type", {
                            required:
                              "This Construction Type field is required",
                          })}
                        >
                          <option value="">Construction Type</option>
                          <option value="Residential Construction">
                            Residential Construction
                          </option>
                          <option value="Commercial Construction">
                            Commercial Construction
                          </option>
                          <option value="Industrial Construction">
                            Industrial Construction
                          </option>
                          <option value="Infrastructure Construction">
                            Infrastructure Construction
                          </option>
                        </select>
                        {errors.construction_type && (
                          <p className="invalid-feedback">
                            {errors?.construction_type?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Sector
                        </label>
                        <select
                          className={`form-control ${
                            errors.sector ? "is-invalid" : ""
                          }`}
                          {...register("sector", {
                            required: "This sector field is required",
                          })}
                        >
                          <option value="">Sector</option>
                          <option value="Health">Health</option>
                          <option value="Education">Education</option>
                          <option value="Corporate">Corporate</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-control"
                          {...register("status")}
                        >
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                      </div>
                    </div>
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
