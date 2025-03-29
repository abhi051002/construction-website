import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { ArrowLeftCircle, MessageCircleCode } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetToken from "../../../hooks/useGetToken";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Edit = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
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
        `${import.meta.env.VITE_BACKEND_URL}/testimonials/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setTestimonials(result.data);
      return {
        testimonial: result.data.testimonial,
        citation: result.data.citation,
        status: result.data.status,
        designation: result.data.designation,
      };
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const newData = { ...data, imageId: imageId };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/testimonials/${id}`,
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
        navigate("/admin/testimonials");
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
            <Sidebar activePage="projects" />
          </div>
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <h4 className="h-5 d-flex">
                    <MessageCircleCode size={28} className="me-2" />
                    {`Testimonials > Edit`}
                  </h4>
                  <Link
                    to="/admin/testimonials"
                    className="btn btn-primary d-flex"
                  >
                    <ArrowLeftCircle className="me-2" />
                    Back
                  </Link>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Testimonial
                    </label>
                    <textarea
                      placeholder="Testimonials"
                      className={`form-control ${
                        errors.testimonial ? "is-invalid" : ""
                      }`}
                      {...register("testimonial", {
                        required: "This testimonial field is required",
                      })}
                    ></textarea>
                    {errors.testimonial && (
                      <p className="invalid-feedback">
                        {errors?.testimonial?.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Citation
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.citation ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Citation"
                        {...register("citation", {
                          required: "This citation field is required",
                        })}
                      />
                      {errors.citation && (
                        <p className="invalid-feedback">
                          {errors?.citation?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Designation
                        </label>
                        <input
                          type="text"
                          className={`form-control`}
                          placeholder="Enter Citation"
                          {...register("designation", {
                            required: "This designation field is required",
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
                    {testimonials.image && (
                      <img
                        src={`${
                          import.meta.env.VITE_FILE_URL
                        }/uploads/testimonials/small/${testimonials.image}`}
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
