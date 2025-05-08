"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">TechTenzin</h1>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-blue-500">Home</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-blue-500">About</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-blue-500">Blog</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-blue-500">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto mt-12 px-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Alternance Développeur Web - 12 mois</h2>
          <p className="text-gray-700 mb-4">
            TechTenzin, une entreprise innovante spécialisée en développement web, recherche un(e) alternant(e) pour une durée de 12 mois.
            Le poste est basé à <span className="font-semibold">Paris 11ème</span>, dans un environnement dyanamique et stimulant.
          </p>
          <p className="text-gray-700 mb-2">
            📍 Lieu :<span>Paris, France</span></p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">💸 Rémunération :</span> 900€ – 1300€/mois selon le profil</p>
          <p className="text-gray-700 mb-4"><span className="font-semibold">🕒 Durée :</span> 12 mois, début dès que possible</p>
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">🎯 Compétences recherchées :</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
            <li>Bonne maîtrise de HTML, CSS, JavaScript</li>
            <li>Connaissance de React et TailwindCSS</li>
            <li>Des bases en PHP et MySQL sont un plus</li>
            <li>Esprit d’équipe et autonomie</li>
          </ul>
          <Link href="/pages">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition">Postuler</button>
          </Link>
        </div>
      </main>
    </div>
  )
}