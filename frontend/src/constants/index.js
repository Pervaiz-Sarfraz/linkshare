import { Image1,Image2,Image3 } from '../assets/Logo/index'

export const navLinks = [
    { href: "/jobs", label: "Jobs" },
    { href: "/companies", label: "Companies" },
    { href: "/add-job", label: "Add Jobs" },
    { href: "/add-company", label: "Add company" },
    { href: "/saved", label: "Saved Jobs" },
];

export const sortby = [
    { id: 1, value: "Relevance" },
    { id: 2, value: "Inclusive" },
    { id: 3, value: "Starts" },
    { id: 4, value: "Contain" }
];

export const type = [
    { id: 1, value: "Remote" },
    { id: 2, value: "Contract" },
    { id: 3, value: "Fulltime" },
    { id: 4, value: "Parttime" }
];

export const level = [
    { id: 1, value: "Beginner" },
    { id: 2, value: "Experienced" },
    { id: 3, value: "Intermediate" },
    { id: 4, value: "Professional" }
];

export const ValuesData = [
    {
        id: 1,
        logo: Image1,
        title: "Simplicity",
        desc: "Things blent more beautiful simple are at the heart of everything we do.",   
    },
    {
        id: 2,
        logo: Image2,
        title: "Social Good",
        desc: "We Believe in making things better for everyone even if just by a little bit!",   
    },
    {
        id: 3,
        logo: Image3,
        title: "Trust",
        desc: "We work on the basis of creating trust which can be nurtured through authenticity and transprancy",   
    }
];
