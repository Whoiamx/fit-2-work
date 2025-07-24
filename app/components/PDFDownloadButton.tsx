"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "@/components/ui/pdf-file";

interface PersonalInfo {
  fullName: string;
  location: string;
  phone: string;
  email: string;
  links: Array<{ label: string; url: string }>;
}

interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

interface Skills {
  technical: string[];
  languages: Array<{ language: string; level: string }>;
}

interface PdfDownloadButtonProps {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skills;
  fileName: string;
}

export function PdfDownloadButton({
  personalInfo,
  summary,
  experiences,
  education,
  skills,
  fileName,
}: PdfDownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={
        <ResumePDF
          personalInfo={personalInfo}
          summary={summary}
          experience={experiences.map((exp) => ({
            jobTitle: exp.jobTitle,
            company: exp.company,
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.description,
          }))}
          education={education.map((edu) => ({
            degree: edu.degree,
            institution: edu.institution,
            startDate: edu.startDate,
            endDate: edu.endDate,
          }))}
          skills={skills}
        />
      }
      fileName={fileName}
      style={{
        textDecoration: "none",
        padding: "10px 20px",
        color: "#fff",
        backgroundColor: "#155DFC",
        borderRadius: 4,
        fontWeight: "bold",
      }}
    >
      {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
    </PDFDownloadLink>
  );
}
