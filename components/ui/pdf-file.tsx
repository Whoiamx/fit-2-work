"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    border: "1px solid #000",
    width: "100%",
    height: "100%",
  },
  container: {
    flexDirection: "column",
    margin: 30,
    border: "1px solid #000",
    padding: 30,
    height: "90%",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  personDataInfo: { fontSize: 10, textAlign: "center", marginBottom: 2 },
  contactInfo: {
    fontSize: 10,
    color: "#0066CC",
    textAlign: "center",
    marginBottom: 2,
  },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 5,
    textAlign: "justify",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  jobTitle: { fontSize: 11, fontWeight: "bold" },
  jobDate: { fontSize: 10, fontStyle: "italic" },
  jobDescription: {
    fontSize: 10,
    lineHeight: 1.3,
    marginBottom: 8,
    textAlign: "justify",
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  degree: { fontSize: 11, fontWeight: "bold" },
  institution: { fontSize: 10, marginBottom: 5 },
  skillsContainer: { marginBottom: 8 },
  skillCategory: { fontSize: 10, fontWeight: "bold", marginBottom: 2 },
  skillsList: { fontSize: 10, marginBottom: 3, marginLeft: 10 },
});

interface ResumePDFProps {
  personalInfo: {
    fullName: string;
    location: string;
    phone: string;
    email: string;
    links: { label: string; url: string }[];
  };
  summary: string;
  experience: {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
  }[];
  skills: {
    technical: string[];
    languages: { language: string; level: string }[];
  };
}

export const ResumePDF = ({
  personalInfo,
  summary,
  experience,
  education,
  skills,
}: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.personDataInfo}>
            {personalInfo.location} • {personalInfo.phone} •{" "}
            {personalInfo.email}
          </Text>
          <Text style={styles.contactInfo}>
            {personalInfo.links.map((link) => link.url).join(" • ")}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>{summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {experience.map((job, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>
                  {job.jobTitle} {job.company && `| ${job.company}`}
                </Text>
                <Text style={styles.jobDate}>
                  {job.startDate} - {job.endDate || "Present"}
                </Text>
              </View>
              <Text style={styles.jobDescription}>{job.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, i) => (
            <View key={i}>
              <View style={styles.educationHeader}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.jobDate}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
              <Text style={styles.institution}>{edu.institution}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>

          <View style={styles.skillsContainer}>
            <Text style={styles.skillCategory}>Technical Skills</Text>
            {skills.technical.map((skill, index) => (
              <Text key={index} style={styles.skillsList}>
                • {skill}
              </Text>
            ))}
          </View>

          <View style={styles.skillsContainer}>
            <Text style={styles.skillCategory}>Languages</Text>
            {skills.languages.map((lang, index) => (
              <Text key={index} style={styles.skillsList}>
                • {lang.language}: {lang.level}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
