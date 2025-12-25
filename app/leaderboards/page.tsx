"use client";

import { useMemo, useState } from "react";
import Hero from "../components/Hero";
type Contributor = { rank: number; name: string; contributions: number; region?: string; avatar?: string };
type Sighting = { rank: number; species: string; count: number; taxa?: string; region?: string };

export default function Leaderboards() {
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [taxaFilter, setTaxaFilter] = useState<string>("All");
  const [tab, setTab] = useState<string>("contributors");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const contributors: Contributor[] = [
    { rank: 1, name: "Aisha Khan", contributions: 128, region: "Global", avatar: "/tysnake.jpg" },
    { rank: 2, name: "David Okoye", contributions: 97, region: "Africa", avatar: "/tysnake.jpg" },
    { rank: 3, name: "Li Wei", contributions: 84, region: "Asia", avatar: "/tysnake.jpg" },
    { rank: 4, name: "Sophie Brown", contributions: 72, region: "Oceania", avatar: "/tysnake.jpg" },
    { rank: 5, name: "Carlos Mendoza", contributions: 65, region: "South America", avatar: "/tysnake.jpg" },
    { rank: 6, name: "Emma Johnson", contributions: 58, region: "North America", avatar: "/tysnake.jpg" },
    { rank: 7, name: "Raj Patel", contributions: 52, region: "Asia", avatar: "/tysnake.jpg" },
    { rank: 8, name: "Fatima Al-Zahra", contributions: 47, region: "Africa", avatar: "/tysnake.jpg" },
    { rank: 9, name: "Hans Mueller", contributions: 43, region: "Europe", avatar: "/tysnake.jpg" },
    { rank: 10, name: "Yuki Tanaka", contributions: 39, region: "Asia", avatar: "/tysnake.jpg" },
    { rank: 11, name: "Maria Garcia", contributions: 36, region: "South America", avatar: "/tysnake.jpg" },
    { rank: 12, name: "James Wilson", contributions: 33, region: "North America", avatar: "/tysnake.jpg" },
    { rank: 13, name: "Ananya Sharma", contributions: 30, region: "Asia", avatar: "/tysnake.jpg" },
    { rank: 14, name: "Pierre Dubois", contributions: 28, region: "Europe", avatar: "/tysnake.jpg" },
    { rank: 15, name: "Zara Ahmed", contributions: 26, region: "Africa", avatar: "/tysnake.jpg" },
    { rank: 16, name: "Oliver Smith", contributions: 24, region: "Oceania", avatar: "/tysnake.jpg" },
    { rank: 17, name: "Isabella Rossi", contributions: 22, region: "Europe", avatar: "/tysnake.jpg" },
    { rank: 18, name: "Ahmed Hassan", contributions: 20, region: "Asia", avatar: "/tysnake.jpg" },
    { rank: 19, name: "Luna Kim", contributions: 18, region: "Asia", avatar: "/tysnake.jpg" },
    { rank: 20, name: "Ethan Davis", contributions: 16, region: "North America", avatar: "/tysnake.jpg" },
  ];

  const sightings: Sighting[] = [
    { rank: 1, species: "African Elephant", count: 342, taxa: "Mammals", region: "Africa" },
    { rank: 2, species: "Bald Eagle", count: 289, taxa: "Birds", region: "North America" },
    { rank: 3, species: "Giant Panda", count: 197, taxa: "Mammals", region: "Asia" },
    { rank: 4, species: "Reticulated Python", count: 154, taxa: "Reptiles", region: "Asia" },
    { rank: 5, species: "Red Kangaroo", count: 123, taxa: "Mammals", region: "Oceania" },
  ];

  const regions = ["All", "Global", "Africa", "Asia", "North America", "Oceania", "Europe", "South America"];
  const taxa = ["All", "Mammals", "Birds", "Reptiles", "Amphibians", "Insects"];

  const filteredContributors = useMemo(() => {
    return contributors
      .filter((c) => regionFilter === "All" || c.region === regionFilter)
      .filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()));
  }, [regionFilter, query]);

  const filteredSightings = useMemo(() => {
    return sightings
      .filter((s) => (regionFilter === "All" || s.region === regionFilter) && (taxaFilter === "All" || s.taxa === taxaFilter))
      .filter((s) => !query || s.species.toLowerCase().includes(query.toLowerCase()));
  }, [regionFilter, taxaFilter, query]);

  return (
    <div className="bg-white">
      <main>

        <Hero></Hero>
        <section className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Wildlife Leaderboards</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore the latest top contributors and the most sighted wildlife species. Track rankings, learn the most observed animals, and see who's making a difference in wildlife mapping globally.
            </p>
          </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="bg-gray-200 rounded-lg p-2 flex items-center gap-2 w-full md:w-auto shadow-md">
              <input
                aria-label="Search leaderboard"
                placeholder="Search names or species…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                className="bg-transparent text-sm outline-none text-black placeholder:text-gray-500 w-full"
              />
            </div>

            <div className="bg-gray-200 rounded-lg p-2 flex items-center gap-2 shadow-md">
              <label className="text-xs text-black">Region</label>
              <select
                value={regionFilter}
                onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
                className="bg-transparent text-sm outline-none text-black"
              >
                {regions.map((r) => (
                  <option key={r} value={r} className="text-black">{r}</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-200 rounded-lg p-2 flex items-center gap-2 shadow-md">
              <label className="text-xs text-black">Taxa</label>
              <select
                value={taxaFilter}
                onChange={(e) => { setTaxaFilter(e.target.value); setPage(1); }}
                className="bg-transparent text-sm outline-none text-black"
              >
                {taxa.map((t) => (
                  <option key={t} value={t} className="text-black">{t}</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-200 rounded-lg p-2 shadow-md">
              <div className="flex items-center gap-1">
                <button onClick={() => setTab("contributors")} className={`px-3 py-1 rounded ${tab === "contributors" ? "bg-emerald-500 text-black" : "text-black/80"}`}>
                  Contributors
                </button>
                <button onClick={() => setTab("sightings")} className={`px-3 py-1 rounded ${tab === "sightings" ? "bg-amber-400 text-black" : "text-black/80"}`}>
                  Sightings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 bg-gray-100 rounded-2xl p-6 shadow-xl overflow-x-auto">
            {tab === "contributors" ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-black">Top Contributors</h2>
                <div className="relative overflow-x-auto bg-gray-100 shadow-sm rounded-lg border border-gray-300">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-sm text-gray-700 bg-gray-300 border-b border-t border-gray-400">
                      <tr>
                        <th scope="col" className="px-3 py-3 font-medium">#</th>
                        <th scope="col" className="px-6 py-3 font-medium">Name</th>
                        <th scope="col" className="px-6 py-3 font-medium">Region</th>
                        <th scope="col" className="px-6 py-3 font-medium text-right">Contributions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContributors.slice((page - 1) * pageSize, page * pageSize).map((c) => (
                        <tr key={c.rank} className="bg-gray-100 border-b border-gray-300 hover:bg-gray-200">
                          <td className="px-3 py-4 font-bold text-lg text-black">{c.rank}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img src={c.avatar} alt={c.name} className={`rounded-full mr-3 p-1 ring-2 ${c.rank <= 5 ? 'w-10 h-10' : 'w-8 h-8'} ${c.rank === 1 ? 'ring-yellow-500' : c.rank === 2 ? 'ring-gray-300' : c.rank === 3 ? 'ring-amber-600' : 'ring-gray-300'}`} />
                              <div>
                                <div className="font-semibold text-black">{c.name}</div>
                                <div className="text-xs text-gray-600">Contributor</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-black">{c.region}</td>
                          <td className="px-6 py-4 text-right font-bold text-emerald-600">{c.contributions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4 text-black">Top Sightings</h2>
                <div className="relative overflow-x-auto bg-gray-100 shadow-sm rounded-lg border border-gray-300">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-sm text-gray-700 bg-gray-300 border-b border-t border-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 font-medium">#</th>
                        <th scope="col" className="px-6 py-3 font-medium">Species</th>
                        <th scope="col" className="px-6 py-3 font-medium">Taxa</th>
                        <th scope="col" className="px-6 py-3 font-medium">Region</th>
                        <th scope="col" className="px-6 py-3 font-medium text-right">Sightings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSightings.slice((page - 1) * pageSize, page * pageSize).map((s) => (
                        <tr key={s.rank} className="bg-gray-100 border-b border-gray-300 hover:bg-gray-200">
                          <td className="px-6 py-4 font-bold text-lg text-black">{s.rank}</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-black">{s.species}</div>
                            <div className="text-xs text-gray-600">{s.taxa}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-black">{s.taxa}</td>
                          <td className="px-6 py-4 text-sm text-black">{s.region}</td>
                          <td className="px-6 py-4 text-right font-bold text-amber-600">{s.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div className="mt-4 flex items-center justify-between bg-gray-200 rounded-lg p-4 shadow-md">
              <div className="text-sm text-black">Showing {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, (tab === 'contributors' ? filteredContributors.length : filteredSightings.length))} of {tab === 'contributors' ? filteredContributors.length : filteredSightings.length}</div>
              <div className="flex items-center gap-2">
                <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded bg-gray-300 disabled:opacity-40 shadow-sm text-black">Previous</button>
                <button onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded bg-gray-300 shadow-sm text-black">Next</button>
              </div>
            </div>
          </div>

          <aside className="bg-gray-100 rounded-2xl p-6 h-fit shadow-xl">
            <h3 className="text-lg font-semibold mb-3 text-black">Leaderboards by</h3>
            <ul className="space-y-2 text-sm">
              <li className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                <button className="text-left text-black w-full" onClick={() => { setTab("sightings"); setTaxaFilter("All"); setPage(1); }}>Global</button>
              </li>
              <li className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                <button className="text-left text-black w-full" onClick={() => { setTab("sightings"); setTaxaFilter("Reptiles"); setPage(1); }}>Reptiles</button>
              </li>
              <li className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                <button className="text-left text-black w-full" onClick={() => { setTab("sightings"); setTaxaFilter("Birds"); setPage(1); }}>Birds</button>
              </li>
              <li className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                <button className="text-left text-black w-full" onClick={() => { setTab("contributors"); setRegionFilter("All"); setPage(1); }}>Authors</button>
              </li>
              <li className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                <button className="text-left text-black w-full" onClick={() => { setRegionFilter("Asia"); setTab("sightings"); setPage(1); }}>Region: Asia</button>
              </li>
            </ul>

            <div className="mt-6 pt-4 text-xs text-black bg-gray-200 rounded-lg p-3 shadow-md">
              Tips: Use filters and search to narrow leaderboards. Data shown are sample placeholders.
            </div>
          </aside>
        </div>
      </section>
      </main>
    </div>
  );
}
