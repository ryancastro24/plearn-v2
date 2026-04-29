"use client";
import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as React from "react";
import {
  getAllBarangays,
  getAllMunicipalities,
  getAllProvinces,
} from "@/lib/queryOptions";
import { Spinner } from "@/components/ui/spinner";
import { teacherRegistration } from "@/backend/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserLoginData } from "@/lib/userQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiPlusCircle } from "react-icons/hi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddNewKidsModal = ({ schoolid }: any) => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const [newTeacher, setNewTeacher] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    suffix: "",
    birthdate: "",
    gender: "",
    province: "",
    city: "",
    barangay: "",
    purok: "",
    citizenship: "",
    profileImage: "",
    contactNumber: "",
    email: "",
    validId: "",
  });
  const [provinceCode, setProvinceCode] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [, setBarangayCode] = useState("");

  const [provinces, municipalities, barangays] = useQueries({
    queries: [
      getAllProvinces(),
      getAllMunicipalities(provinceCode),
      getAllBarangays(cityCode),
    ],
  });

  const {
    mutate: createUserMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: teacherRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schoolteachers"],
      });
      setOpenModal(false);
      setNewTeacher({
        firstname: "",
        middlename: "",
        lastname: "",
        suffix: "",
        birthdate: "",
        gender: "",
        province: "",
        city: "",
        barangay: "",
        purok: "",
        citizenship: "",
        profileImage: "",
        contactNumber: "",
        email: "",
        validId: "",
      });
      setAlertDialogOpen(true);
    },
    onError: (error: any) => {
      setAlertDialogOpen(true);
      setMissingFields(error.missingFields || []);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createUserMutation({
      ...newTeacher,
      userType: "teacher",
      schoolId: schoolid,
    });
  };

  return (
    <>
      <Dialog open={openModal} onOpenChange={(open) => setOpenModal(open)}>
        <DialogTrigger asChild>
          <Button className="bg-[#685AFF] text-white">Add new teacher</Button>
        </DialogTrigger>

        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>Add new teachee</DialogTitle>
            <DialogDescription>
              Create an accounts for teachers in your school. Please fill out
              all the required fields to ensure successful account creation.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger
                className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                value="personalinfo"
              >
                Personal information
              </TabsTrigger>

              <TabsTrigger
                className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                value="address"
              >
                Address
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
                value="otherinfo"
              >
                Other information
              </TabsTrigger>
            </TabsList>

            {/* personal information */}
            <TabsContent value="personalinfo">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Firstname </Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          firstname: e.target.value,
                        })
                      }
                      placeholder="Enter firstname"
                      value={newTeacher.firstname}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Middlename</Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          middlename: e.target.value,
                        })
                      }
                      value={newTeacher.middlename}
                      placeholder="Enter middlename"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Lastname</Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          lastname: e.target.value,
                        })
                      }
                      value={newTeacher.lastname}
                      placeholder="Enter lastname"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Suffix </Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          suffix: e.target.value,
                        })
                      }
                      value={newTeacher.suffix}
                      placeholder="Enter suffix"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Gender </Label>
                    <Select
                      onValueChange={(value) =>
                        setNewTeacher({
                          ...newTeacher,
                          gender: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>birthdate</Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          birthdate: e.target.value,
                        })
                      }
                      value={newTeacher.birthdate}
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* address */}
            <TabsContent value="address">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Province</Label>

                    <Select
                      onValueChange={(value) => {
                        setProvinceCode(value);

                        const selectedProvince = provinces.data?.find(
                          (p: any) => p.code === value,
                        );

                        setNewTeacher({
                          ...newTeacher,
                          province: selectedProvince?.name || "",
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {provinces.data?.map((province: any) => (
                            <SelectItem
                              key={province.code}
                              value={province.code}
                            >
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>City</Label>
                    <Select
                      onValueChange={(value) => {
                        setCityCode(value);
                        const selectedMunicipality = municipalities.data?.find(
                          (p: any) => p.code === value,
                        );

                        setNewTeacher({
                          ...newTeacher,
                          city: selectedMunicipality?.name || "",
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {municipalities.data?.map((municipality: any) => (
                            <SelectItem
                              key={municipality.code}
                              value={municipality.code}
                            >
                              {municipality.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Barangay</Label>
                    <Select
                      onValueChange={(value) => {
                        setBarangayCode(value);
                        const selectedBarangay = barangays.data?.find(
                          (p: any) => p.code === value,
                        );

                        setNewTeacher({
                          ...newTeacher,
                          barangay: selectedBarangay?.name || "",
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select barangay" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {barangays.data?.map((barangay: any) => (
                            <SelectItem
                              key={barangay.code}
                              value={barangay.code}
                            >
                              {barangay.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Purok/District/Zone</Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          purok: e.target.value,
                        })
                      }
                      value={newTeacher.purok}
                      placeholder="Enter Purok/District/Zone"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* other information */}
            <TabsContent value="otherinfo">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Citizenship</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewTeacher({
                          ...newTeacher,
                          citizenship: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select citizenship" />
                      </SelectTrigger>
                      <SelectContent defaultValue={"filipino"}>
                        <SelectGroup>
                          <SelectItem value="filipino">Filipino</SelectItem>
                          <SelectItem value="chinese">Chinese </SelectItem>
                          <SelectItem value="american">American </SelectItem>
                          <SelectItem value="japanese">Japanese </SelectItem>
                          <SelectItem value="korean">Korean </SelectItem>
                          <SelectItem value="french">French </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Pofile image </Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          profileImage: e.target.value,
                        })
                      }
                      type="file"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Contact number</Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          contactNumber: e.target.value,
                        })
                      }
                      value={newTeacher.contactNumber}
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Email</Label>
                    <Input
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          email: e.target.value,
                        })
                      }
                      value={newTeacher.email}
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="">
                  <div className="flex flex-col gap-1">
                    <Label>Valid Id</Label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          validId: e.target.value,
                        })
                      }
                      value={newTeacher.validId}
                      placeholder="Enter valid ID"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex items-center gap-3">
            <DialogClose asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogClose>
            <Button
              disabled={isPending}
              onClick={handleSubmit}
              className="text-white bg-[#ff5b5b]"
            >
              {isPending ? (
                <>
                  <Spinner /> Creating...
                </>
              ) : (
                <>Create Account</>
              )}{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={alertDialogOpen}
        onOpenChange={(open) => setAlertDialogOpen(open)}
      >
        <AlertDialogContent className="max-w-150">
          <AlertDialogHeader>
            {isError ? (
              <AlertDialogTitle>
                Error! {(error as Error).message}
              </AlertDialogTitle>
            ) : (
              <AlertDialogTitle>Congratulations!</AlertDialogTitle>
            )}

            {isError ? (
              <AlertDialogDescription>
                {missingFields.length > 0 ? (
                  <div>
                    <ul className="flex items-center justify-center flex-wrap gap-2 mt-2">
                      {missingFields.map((field, index) => (
                        <li
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm"
                        >
                          {field}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <span>{(error as Error).message}</span>
                )}
              </AlertDialogDescription>
            ) : (
              <AlertDialogDescription>
                Your account has been created successfully.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddNewKidsModal;
