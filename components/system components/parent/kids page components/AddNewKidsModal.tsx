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
import { kidRegistration } from "@/backend/user";
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

const AddNewKidsModal = () => {
  const queryClient = useQueryClient();
  const { data: userLoginData } = useQuery(getUserLoginData());
  const [openModal, setOpenModal] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const [newStudent, setNewStudent] = useState({
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
    characteristics: [] as string[],
  });
  const [provinceCode, setProvinceCode] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [, setBarangayCode] = useState("");

  const characteristicsOptions = [
    "Friendly",
    "Helpful",
    "Creative",
    "Active",
    "Curious",
    "Responsible",
    "Kind",
    "Shy",
  ];

  const [selectedCharacteristics, setSelectedCharacteristics] = React.useState<
    string[]
  >([]);

  const toggleCharacteristic = (value: string) => {
    setSelectedCharacteristics((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

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
    mutationFn: kidRegistration,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["userkids"], exact: true });
      setOpenModal(false);
      setNewStudent({
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
        characteristics: [] as string[],
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
      ...newStudent,
      characteristics: selectedCharacteristics,
      username: `${newStudent.firstname.toLowerCase()}.${newStudent.lastname.toLowerCase()}${Math.floor(100 + Math.random() * 900)}`,
      password:
        newStudent.birthdate.split("-").reverse().join("") +
        "_" +
        newStudent.firstname.toLowerCase(),
      userType: "student",
      parentId: userLoginData?._id || "",
    });
  };

  return (
    <>
      <Dialog open={openModal} onOpenChange={(open) => setOpenModal(open)}>
        <DialogTrigger className="w-15 h-15 md:w-18 md:h-18 flex items-center justify-center cursor-pointer hover:bg-[#f84949] bg-[#FF5B5B] text-white rounded-full shadow shadow-black/20">
          <HiPlusCircle className="md:text-5xl text-4xl" />
        </DialogTrigger>

        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>Add your kid</DialogTitle>
            <DialogDescription>
              Create an account for your kid for better learning and lifestyle
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
                        setNewStudent({
                          ...newStudent,
                          firstname: e.target.value,
                        })
                      }
                      placeholder="Enter firstname"
                      value={newStudent.firstname}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Middlename</Label>
                    <Input
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          middlename: e.target.value,
                        })
                      }
                      value={newStudent.middlename}
                      placeholder="Enter middlename"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Lastname</Label>
                    <Input
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          lastname: e.target.value,
                        })
                      }
                      value={newStudent.lastname}
                      placeholder="Enter lastname"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Suffix </Label>
                    <Input
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          suffix: e.target.value,
                        })
                      }
                      value={newStudent.suffix}
                      placeholder="Enter suffix"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Gender </Label>
                    <Select
                      onValueChange={(value) =>
                        setNewStudent({
                          ...newStudent,
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
                        setNewStudent({
                          ...newStudent,
                          birthdate: e.target.value,
                        })
                      }
                      value={newStudent.birthdate}
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

                        setNewStudent({
                          ...newStudent,
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

                        setNewStudent({
                          ...newStudent,
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

                        setNewStudent({
                          ...newStudent,
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
                        setNewStudent({
                          ...newStudent,
                          purok: e.target.value,
                        })
                      }
                      value={newStudent.purok}
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
                        setNewStudent({
                          ...newStudent,
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
                        setNewStudent({
                          ...newStudent,
                          profileImage: e.target.value,
                        })
                      }
                      type="file"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 col-span-2">
                  <Label>Characteristics</Label>

                  <div className="flex flex-wrap gap-2 rounded-md border p-3">
                    {characteristicsOptions.map((item) => {
                      const isSelected = selectedCharacteristics.includes(item);

                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() => toggleCharacteristic(item)}
                          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                            isSelected
                              ? "bg-[#FF5B5B] text-white border-[#FF5B5B]"
                              : "bg-white text-black hover:bg-gray-100"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  {selectedCharacteristics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCharacteristics.map((item) => (
                        <div
                          key={item}
                          className="rounded-full bg-[#FF5B5B]/15 text-[#FF5B5B] px-3 py-1 text-sm font-medium border border-[#FF5B5B]/30"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
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
