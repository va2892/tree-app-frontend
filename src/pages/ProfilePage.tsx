import { useState, useEffect } from "react";
import { getAuthHeaders } from "../helpers/getAuthHeaders";
import { getProfile, updateProfile } from "../api/profileApi";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
	const [form, setForm] = useState<any>(null);
	const token = localStorage.getItem("token");

	useAuth();

	useEffect(() => {
	  	getProfile().then(data => {
	  	  	setProfile(data);
	  	  	setForm(data);
	  	});
	}, []);

	return (
		<>
			{(profile != null) && (
				<div>
					<h1>Profile</h1>
					<p>Полное имя: <input value={form.fullName} onChange={ (e) => setForm({ ...form, fullName: e.target.value }) } /></p>
					<p>Email: <input value={form.email} onChange={ (e) => setForm({ ...form, email: e.target.value }) } /></p>
					<p>Телефон: <input value={form.phoneNumber} onChange={ (e) => setForm({ ...form, phoneNumber: e.target.value }) } /></p>
					<p>Пол: <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
								<option value="Male">Мужской</option>
								<option value="Female">Женский</option>
							</select>
					</p>
					<br/>
					<button 
						onClick={async () => { 
							await updateProfile(form)
							alert("Сохранено")
						}}
					>
						Сохранить изменения
					</button>
				</div>
			)}
		</>
	)
}