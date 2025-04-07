import React from 'react';
import './style.js'; // Importing styles for the modal
import Wrapper from './style.js';

const TeacherModal = ({ teacher, onClose }) => {
    if (!teacher) return null; // If no teacher is selected, return null

    return (
        <Wrapper>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <img src={teacher.avatar} alt={teacher.name} className="modal-avatar" />
                    <h2>{teacher.teacher_name}</h2>
                    <p><strong>Role:</strong> {teacher.role}</p>
                    <p><strong>Section</strong> {teacher.section}</p>
                    <p><strong>Email:</strong> {teacher.email}</p>
                    <p><strong>Subjects:</strong> {teacher.subjects.join(', ')}</p>
                    <p><strong>Class:</strong> {teacher.classes}</p>
                </div>
            </div>
        </Wrapper>
    );
};

export default TeacherModal;
