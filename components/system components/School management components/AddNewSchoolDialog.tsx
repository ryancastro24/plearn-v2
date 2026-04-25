"use client";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProvinces,
  getAllMunicipalities,
  getAllBarangays,
} from "@/lib/queryOptions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addNewShoolForm } from "@/backend/school";

const AddNewSchoolDialog = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({
    schoolId: "",
    name: "",
    classification: "",
    province: "",
    city: "",
    barangay: "",
    purok: "",
    vision: "",
    mission: "",
    goals: "",
    logo: null as File | null,
  });

  const [provinceCode, setProvinceCode] = useState("");
  const [cityCode, setCityCode] = useState("");

  const [provinces, municipalities, barangays] = useQueries({
    queries: [
      getAllProvinces(),
      getAllMunicipalities(provinceCode),
      getAllBarangays(cityCode),
    ],
  });

  // ✅ Mutation (FormData)
  const createSchool = useMutation({
    mutationFn: addNewShoolForm,
    onSuccess: () => {
      alert("successs");
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      setOpen(false);
      resetForm();
    },
  });

  const resetForm = () => {
    setForm({
      name: "",
      classification: "",
      province: "",
      city: "",
      barangay: "",
      purok: "",
      vision: "",
      mission: "",
      goals: "",
      logo: null,
      schoolId: "",
    });
    setProvinceCode("");
    setCityCode("");
  };

  const handleSubmit = () => {
    // ✅ basic validation
    if (!form.name || !form.classification) {
      alert("Name and classification are required");
      return;
    }

    // ✅ pass form as mutation variables
    createSchool.mutate(form);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-[#FF5B5B] to-[#F04886]">
          Add new school
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add a new school</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="vmg">VMG</TabsTrigger>
          </TabsList>

          {/* DETAILS */}
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="w-full grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Label>School Id</Label>
                <Input
                  placeholder="Enter school id"
                  value={form.schoolId}
                  onChange={(e) =>
                    setForm({ ...form, schoolId: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>School name</Label>
                <Input
                  placeholder="Enter school name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Label>Classification</Label>
                <Select
                  onValueChange={(val) =>
                    setForm({ ...form, classification: val })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select classification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Upload school logo</Label>

                <Input
                  type="file"
                  onChange={(e) =>
                    setForm({ ...form, logo: e.target.files?.[0] })
                  }
                />
              </div>
            </div>
          </TabsContent>

          {/* ADDRESS */}
          <TabsContent value="address" className="space-y-4 mt-4">
            <div className="w-full grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Label>Province</Label>
                <Select
                  onValueChange={(value) => {
                    setProvinceCode(value);
                    const p = provinces.data?.find(
                      (x: any) => x.code === value,
                    );
                    setForm({ ...form, province: p?.name || "" });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.data?.map((p: any) => (
                      <SelectItem key={p.code} value={p.code}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>City</Label>
                <Select
                  disabled={!provinceCode}
                  onValueChange={(value) => {
                    setCityCode(value);
                    const c = municipalities.data?.find(
                      (x: any) => x.code === value,
                    );
                    setForm({ ...form, city: c?.name || "" });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalities.data?.map((c: any) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Label>Barangay</Label>
                <Select
                  disabled={!cityCode}
                  onValueChange={(value) => {
                    const b = barangays.data?.find(
                      (x: any) => x.code === value,
                    );
                    setForm({ ...form, barangay: b?.name || "" });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select barangay" />
                  </SelectTrigger>
                  <SelectContent>
                    {barangays.data?.map((b: any) => (
                      <SelectItem key={b.code} value={b.code}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Purok/District/Zone</Label>
                <Input
                  placeholder="Purok/District/Zone"
                  value={form.purok}
                  onChange={(e) => setForm({ ...form, purok: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>

          {/* VMG */}
          <TabsContent value="vmg" className="space-y-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label>Vision</Label>
              <Textarea
                placeholder="Enter vision"
                value={form.vision}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Mission</Label>
              <Textarea
                placeholder="Enter mission"
                value={form.mission}
                onChange={(e) => setForm({ ...form, mission: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Goals</Label>
              <Input
                placeholder="Enter goals"
                value={form.goals}
                onChange={(e) => setForm({ ...form, goals: e.target.value })}
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>

          <Button
            onClick={handleSubmit}
            disabled={createSchool.isPending}
            className="bg-[#FF5B5B]"
          >
            {createSchool.isPending ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSchoolDialog;
