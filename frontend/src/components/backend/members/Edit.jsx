import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { ArrowLeftCircle, MessageCircleCode, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetToken from "../../../hooks/useGetToken";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Edit = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const { id } = useParams();
  const { token } = useGetToken();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/members/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setMembers(result.data);
      return {
        name: result.data.name,
        job_title: result.data.job_title,
        linkedin_url: result.data.linkedin_url,
        status: result.data.status,
      };
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const newData = { ...data, imageId: imageId };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/members/${id}`,
        {
          method: "PUT",
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
        navigate("/admin/members");
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
    try {
      setIsDisable(true);
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
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while uploading the image.");
    } finally {
      setIsDisable(false);
    }
  };
  return (
    <main className="dashboard-container bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            {/* Sidebar */}
            <Sidebar activePage="members" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <h4 className="h-5 d-flex">
                    <Users size={28} className="me-2" />
                    {`Members > Edit`}
                  </h4>
                  <Link to="/admin/members" className="btn btn-primary d-flex">
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
                    <textarea
                      placeholder="Enter Name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      {...register("name", {
                        required: "This name field is required",
                      })}
                    ></textarea>
                    {errors.name && (
                      <p className="invalid-feedback">
                        {errors?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Job Title
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.job_title ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Job Title"
                        {...register("job_title", {
                          required: "This job title field is required",
                        })}
                      />
                      {errors.job_title && (
                        <p className="invalid-feedback">
                          {errors?.job_title?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          LinkedIn Url
                        </label>
                        <input
                          type="text"
                          className={`form-control`}
                          placeholder="Enter LinkedIn URL"
                          {...register("linkedin_url", {
                            required: "This linkedin url field is required",
                          })}
                        />
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
                      Image
                    </label>
                    <br />
                    <input type="file" onChange={handleFile} />
                  </div>
                  <div className="pb-3">
                    {members.image && (
                      <img
                        src={`${
                          import.meta.env.VITE_FILE_URL
                        }/uploads/members/${members.image}`}
                      />
                    )}
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    disabled={isDisable}
                  >
                    {loading ? "Updating..." : "Update"}
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

export default Edit;
