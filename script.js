// // import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// // /* ---------------- Supabase config ---------------- */
// // const SUPABASE_URL = 'https://oykgmkoplpcbwohmvvfh.supabase.co'
// // const SUPABASE_KEY =
// //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a2dta29wbHBjYndvaG12dmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4ODg0NjksImV4cCI6MjA3ODQ2NDQ2OX0.Uev5aXttg55gZYdMjiS8SahYB3BXULNTVvUEgH6khdk'

// // const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
// //   auth: { persistSession: false }
// // })

// // /*---------------- Webhook (Google Apps Script) ----------------*/
// // const EDGE_SHEET_URL =
// //   'https://oykgmkoplpcbwohmvvfh.supabase.co/functions/v1/quick-endpoint'

// // /* ---------------- Helpers & DOM ---------------- */
// // const statusEl = document.getElementById('connectionStatus')
// // const tableBody = document.querySelector('#dataTable tbody')
// // const form = document.getElementById('candidateForm')
// // const submitBtn = document.getElementById('submitBtn')
// // const cancelBtn = document.getElementById('cancelEditBtn')
// // const searchEl = document.getElementById('searchInput')
// // const openFormBtn = document.getElementById('openFormBtn')

// // const titleMapBtn = document.getElementById('titleMapBtn')
// // const titleMapPopup = document.getElementById('titleMapPopup')
// // const closeTitleMap = document.getElementById('closeTitleMap')

// // const listEl = document.getElementById('list')
// // const searchInputTM = document.getElementById('searchInputTM')
// // const openAddBtnTM = document.getElementById('openAddBtnTM')
// // const modalBackTM = document.getElementById('modalBack')
// // const editBackTM = document.getElementById('editBack')

// // const modeSelect = document.getElementById('modeSelect')
// // const submitModalBtn = document.getElementById('submitModalBtn')
// // const cancelBtnTM = document.getElementById('cancelBtnTM')

// // const titleFields = document.getElementById('titleFields')
// // const itemFields = document.getElementById('itemFields')
// // const itemNameRow = document.getElementById('itemNameRow')

// // const newTitleInput = document.getElementById('newTitleInput')
// // const newItemInput = document.getElementById('newItemInput')
// // const selectTitleForItem = document.getElementById('selectTitleForItem')

// // const editFields = document.getElementById('editFields')
// // const editCancel = document.getElementById('editCancel')
// // const editSave = document.getElementById('editSave')

// // let allRows = []
// // let editingId = null
// // let pendingDelete = { id: null, name: '' }
// // let titles = []
// // let currentEdit = null

// // // For candidate suggestion selection in Title Map->Add Item
// // let selectedCandidateId = null
// // let suggestionBox = null
// // let suggestionDebounceTimer = null

// // /* ---------------- Safety HTML encode ---------------- */
// // const encodeHTML = (str = '') =>
// //   String(str).replace(/[&<>"'`=\/]/g, s =>
// //     ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' }[s])
// //   )

// // function setStatusOk(text) {
// //   statusEl.classList.remove('error')
// //   statusEl.classList.add('ok')
// //   statusEl.textContent = `✅ ${text}`
// // }

// // function setStatusErr(text) {
// //   statusEl.classList.remove('ok')
// //   statusEl.classList.add('error')
// //   statusEl.textContent = `❌ ${text}`
// // }

// // /* ---------------- Initial Supabase tests & Data load ---------------- */
// // async function testConnection() {
// //   try {
// //     const { count, error } = await supabase.from('Email_Atm').select('*', { count: 'exact', head: true })
// //     if (error) throw error
// //     setStatusOk(`Connected to Supabase (${count} records)`)
// //   } catch (e) {
// //     setStatusErr(`Failed to connect: ${e.message}`)
// //   }
// // }

// // async function loadData() {
// //   const { data, error } = await supabase.from('Email_Atm').select('*').order('Unique')
// //   if (error) return setStatusErr(`Query failed: ${error.message}`)
// //   allRows = data || []
// //   renderTable(allRows)
// // }

// // function renderTable(rows) {
// //   tableBody.innerHTML = ''
// //   rows.forEach(row => {
// //     const tr = document.createElement('tr')
// //     tr.innerHTML = `
// //       <td>${row.Unique}</td>
// //       <td>${encodeHTML(row['Candidate Name'] || '')}</td>
// //       <td>${encodeHTML(row['Contact No'] || '')}</td>
// //       <td>${encodeHTML(row.Email || '')}</td>
// //       <td>${encodeHTML(row.Skills || '')}</td>
// //       <td>${encodeHTML(row['Visa status'] || '')}</td>
// //       <td>${encodeHTML(row['Skype ID'] || '')}</td>
// //       <td>${encodeHTML(row['Current Location'] || '')}</td>
// //       <td>${encodeHTML(row['DOB(MM/DD)'] || '')}</td>
// //       <td>${encodeHTML(row['Relocation (Yes/No)'] || '')}</td>
// //       <td>${encodeHTML(row['Onsite or Remote:'] || '')}</td>
// //       <td>${encodeHTML(row['Bachelor: University//year of completion'] || '')}</td>
// //       <td>${encodeHTML(row.Title || '')}</td>
// //       <td>${encodeHTML(row.Rate || '')}</td>
// //       <td>${encodeHTML(row['Recruiter name'] || '')}</td>
// //       <td class="actions">
// //         <button class="btn secondary btn-edit" data-id="${row.Unique}"> Edit </button>
// //         <button class="btn danger btn-delete" data-id="${row.Unique}" data-name="${encodeHTML(row['Candidate Name'] || '')}"> Delete </button>
// //       </td>
// //     `
// //     tableBody.appendChild(tr)
// //   })
// // }

// // /* ---------------- Search ---------------- */
// // searchEl.addEventListener('input', () => {
// //   const q = searchEl.value.toLowerCase()
// //   if (!q) return renderTable(allRows)
// //   const filtered = allRows.filter(r => {
// //     return [r['Candidate Name'], r.Email, r.Skills, r.Title, r['Recruiter name'], r['Current Location']]
// //       .map(v => (v || '').toString().toLowerCase())
// //       .some(v => v.includes(q))
// //   })
// //   renderTable(filtered)
// // })

// // /* ---------------- Candidate add/edit/delete ---------------- */
// // openFormBtn.addEventListener("click", () => {
// //   editingId = null
// //   form.reset()
// //   submitBtn.textContent = "Add Candidate"
// //   cancelBtn.classList.add("hidden")
// //   form.classList.remove("hidden")
// //   form.scrollIntoView({ behavior: "smooth" })
// // })

// // cancelBtn.addEventListener("click", () => {
// //   form.classList.add("hidden")
// //   form.reset()
// //   editingId = null
// // })

// // tableBody.addEventListener('click', async (e) => {
// //   const btn = e.target.closest('button'); if (!btn) return

// //   if (btn.classList.contains('btn-edit')) {
// //     const id = Number(btn.dataset.id)
// //     const { data, error } = await supabase.from('Email_Atm').select('*').eq('Unique', id).single()
// //     if (error) return alert('Error loading record: ' + error.message)
// //     editingId = id; form.classList.remove('hidden')
// //     const set = (id, v='') => (document.getElementById(id).value = v || '')
// //     set('candidateName', data['Candidate Name'])
// //     set('contactNo', data['Contact No'])
// //     set('email', data.Email)
// //     set('skills', data.Skills)
// //     set('visaStatus', data['Visa status'])
// //     set('skypeId', data['Skype ID'])
// //     set('currentLocation', data['Current Location'])
// //     set('dob', data['DOB(MM/DD)'])
// //     set('relocation', data['Relocation (Yes/No)'])
// //     set('onsiteRemote', data['Onsite or Remote:'])
// //     set('bachelor', data['Bachelor: University//year of completion'])
// //     set('masters', data["Master's /university/ year of completion"])
// //     set('ssn', data['SSN no. last 4 digit'])
// //     set('linkedin', data.LinkedIn)
// //     set('ppNo', data['PP No'])
// //     set('totalExp', data['Total Exp'])
// //     set('expUS', data['Total years of Exp in US'])
// //     set('availProject', data['Availability for Project'])
// //     set('availInterview', data['Availability for Interview'])
// //     set('bestTime', data['Best Time to reach'])
// //     set('resume', data.Resume)
// //     set('dl', data.DL)
// //     set('title', data.Title)
// //     set('rate', data.Rate)
// //     set('recruiterName', data['Recruiter name'])
// //     set('recruiterEmail', data['Recruiter email'])
// //     set('recruiterPhone', data['Recruiter Phone'])
// //     set('match', data.Match)
// //     submitBtn.textContent = "Update Candidate"; cancelBtn.classList.remove("hidden"); form.scrollIntoView({ behavior: "smooth" })
// //     return
// //   }

// //   if (btn.classList.contains('btn-delete')) {
// //     const id = Number(btn.dataset.id)
// //     const name = btn.dataset.name || 'this candidate'
// //     pendingDelete = { id, name }
// //     document.getElementById('deleteText').textContent = `Are you sure you want to delete "${name}"?`
// //     document.getElementById('deleteModal').classList.remove("hidden")
// //     return
// //   }
// // })

// // document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
// //   const { id } = pendingDelete; if (!id) return
// //   const { error } = await supabase.from('Email_Atm').delete().eq('Unique', id)
// //   if (error) alert('Delete failed: ' + error.message)
// //   document.getElementById('deleteModal').classList.add("hidden")
// //   await loadData()
// // })
// // document.getElementById('cancelDeleteBtn').addEventListener('click', () => document.getElementById('deleteModal').classList.add('hidden'))
// // document.getElementById('deleteModal').addEventListener('click', e => { if (e.target === document.getElementById('deleteModal')) document.getElementById('deleteModal').classList.add('hidden') })

// // form.addEventListener('submit', async (e) => {
// //   e.preventDefault()
// //   const record = {
// //     'Candidate Name': candidateName.value,
// //     'Contact No': contactNo.value,
// //     Email: email.value,
// //     Skills: skills.value,
// //     'Visa status': visaStatus.value,
// //     'Skype ID': skypeId.value,
// //     'Current Location': currentLocation.value,
// //     'DOB(MM/DD)': dob.value,
// //     'Relocation (Yes/No)': relocation.value,
// //     'Onsite or Remote:': onsiteRemote.value,
// //     'Bachelor: University//year of completion': bachelor.value,
// //     "Master's /university/ year of completion": masters.value,
// //     'SSN no. last 4 digit': ssn.value,
// //     LinkedIn: linkedin.value,
// //     'PP No': ppNo.value,
// //     'Total Exp': totalExp.value,
// //     'Total years of Exp in US': expUS.value,
// //     'Availability for Project': availProject.value,
// //     'Availability for Interview': availInterview.value,
// //     'Best Time to reach': bestTime.value,
// //     Resume: resume.value,
// //     DL: dl.value,
// //     Title: title.value,
// //     Rate: rate.value,
// //     'Recruiter name': recruiterName.value,
// //     'Recruiter email': recruiterEmail.value,
// //     'Recruiter Phone': recruiterPhone.value,
// //     Match: match.value
// //   }

// //   if (editingId) {
// //     const { error } = await supabase.from('Email_Atm').update(record).eq('Unique', editingId)
// //     if (error) return alert("Update failed: " + error.message)
// //     alert("Candidate Updated!")
// //   } else {
// //     const { error } = await supabase.from('Email_Atm').insert([record])
// //     if (error) return alert("Insert failed: " + error.message)
// //     alert("Candidate Added!")
// //   }

// //   editingId = null; form.reset(); form.classList.add("hidden"); cancelBtn.classList.add("hidden"); submitBtn.textContent = "Add Candidate"
// //   await loadData()
// // })

// // /* ---------------- Title Map popup & CRUD ---------------- */

// // titleMapBtn.addEventListener('click', async () => {
// //   titleMapPopup.classList.remove('hidden')
// //   await loadTitles()
// // })
// // closeTitleMap.addEventListener('click', () => titleMapPopup.classList.add('hidden'))

// // async function loadTitles() {
// //   listEl.innerHTML = '<div class="muted">Loading titles...</div>'
// //   const { data, error } = await supabase.from('Title_Map').select('*').order('id')
// //   if (error) { listEl.innerHTML = `<div class="muted">Error loading titles: ${error.message}</div>`; return }
// //   titles = data || []
// //   renderTitles()
// //   fillTitleDropdown()
// // }

// // function renderTitles(filter='') {
// //   listEl.innerHTML = ''
// //   const filtered = titles.filter(t => t.title_name.toLowerCase().includes(filter.toLowerCase()))
// //   if (!filtered.length) { listEl.innerHTML = '<div class="muted">No titles yet</div>'; return }
// //   filtered.forEach(title => {
// //     const tile = document.createElement('div')
// //     tile.className = 'tile'
// //     tile.innerHTML = `
// //       <div class="title-left">
// //         <div class="title-name">${encodeHTML(title.title_name)}</div>
// //         <div class="itemsRow" id="items-${title.id}">Loading...</div>
// //       </div>
// //       <div class="tileHeader">
// //         <div>
// //           <div class="meta">ID: ${title.id}</div>
// //         </div>
// //         <div class="title-actions">
// //           <button class="btn secondary edit-title-btn" data-id="${title.id}">Edit</button>
// //           <button class="btn danger delete-title-btn" data-id="${title.id}">Delete</button>
// //         </div>
// //       </div>
// //     `
// //     listEl.appendChild(tile)
// //     loadItems(title.id)
// //   })
// // }
// // modeSelect.addEventListener("change", () => {
// //   const mode = modeSelect.value;

// //   if (mode === "title") {
// //     titleFields.style.display = "flex";
// //     itemFields.style.display = "none";
// //     itemNameRow.style.display = "none";
// //     destroySuggestionBox()
// //   } else {
// //     titleFields.style.display = "none";
// //     itemFields.style.display = "flex";
// //     itemNameRow.style.display = "flex";
// //     ensureSuggestionBox()
// //   }
// // });

// // /* Load Title_Items for a title and show chips */
// // async function loadItems(titleId) {
// //   const el = document.getElementById(`items-${titleId}`)
// //   if (!el) return
// //   el.innerHTML = 'Loading...'

// //   // fetch Title_Items rows
// //   const { data, error } = await supabase.from('Title_Items').select('*').eq('title_id', titleId).order('id')
// //   if (error) {
// //     el.innerHTML = `<span class="muted">Error: ${error.message}</span>`
// //     return
// //   }
// //   if (!data || !data.length) {
// //     el.innerHTML = '<span class="muted">No IDs</span>'
// //     return
// //   }

// //   // Parse stored item_name values into numeric IDs (remove spaces)
// //   const ids = data
// //     .map(i => {
// //       if (i.item_name === null || typeof i.item_name === 'undefined') return null
// //       return Number(String(i.item_name).trim())
// //     })
// //     .filter(n => Number.isFinite(n))

// //   // If we have numeric ids, fetch candidate names via a safe OR query
// //   let candidatesById = {}
// //   if (ids.length) {
// //     try {
// //       // build OR expression: Unique.eq.1,Unique.eq.85,...
// //       const orExpr = ids.map(id => `Unique.eq.${id}`).join(',')
// //       const { data: cdata, error: cerror } = await supabase
// //         .from('Email_Atm')
// //         .select('Unique, "Candidate Name"')
// //         .or(orExpr)

// //       if (!cerror && cdata && cdata.length) {
// //         cdata.forEach(c => { candidatesById[String(c.Unique)] = c['Candidate Name'] })
// //       }
// //     } catch (err) {
// //       console.error('Error fetching candidate names', err)
// //       // fallback: leave candidatesById empty
// //     }
// //   }

// //   // render chips with "ID — Candidate Name" (if available)
// //   el.innerHTML = data.map(i => {
// //     const idStr = String(i.item_name)
// //     const name = candidatesById[idStr] ? ` — ${encodeHTML(candidatesById[idStr])}` : ''
// //     return `
// //       <span class="chip" data-item-id="${i.id}" data-title-id="${titleId}">
// //         ${encodeHTML(idStr)}${name}
// //         <button class="edit-item-btn" data-item-id="${i.id}" data-title-id="${titleId}"> Edit </button>
// //         <button class="delete-item-btn" data-item-id="${i.id}" data-title-id="${titleId}"> Delete </button>
// //       </span>
// //     `
// //   }).join('')
// // }

// // searchInputTM.addEventListener('input', (e) => renderTitles(e.target.value))

// // openAddBtnTM.addEventListener('click', () => {
// //   modeSelect.value = 'title'
// //   modeSelect.dispatchEvent(new Event("change"))
// //   titleFields.style.display = 'flex'
// //   itemFields.style.display = 'none'
// //   itemNameRow.style.display = 'none'
// //   newTitleInput.value = ''
// //   newItemInput.value = ''
// //   selectTitleForItem.innerHTML = ''
// //   modalBackTM.classList.remove('hidden')
// //   fillTitleDropdown()
// // })

// // modeSelect.addEventListener('change', () => {
// //   const m = modeSelect.value
// //   if (m === 'title') {
// //     titleFields.style.display = 'flex'
// //     itemFields.style.display = 'none'
// //     itemNameRow.style.display = 'none'
// //     destroySuggestionBox()
// //   } else {
// //     titleFields.style.display = 'none'
// //     itemFields.style.display = 'flex'
// //     itemNameRow.style.display = 'flex'
// //     ensureSuggestionBox()
// //   }
// // })

// // cancelBtnTM.addEventListener('click', () => {
// //   modalBackTM.classList.add('hidden')
// //   destroySuggestionBox()
// // })

// // submitModalBtn.addEventListener('click', async () => {
// //   const mode = modeSelect.value
// //   try {
// //     if (mode === 'title') {
// //       const name = (newTitleInput.value || '').trim()
// //       if (!name) return alert('Enter title name')
// //       const { data, error } = await supabase.from('Title_Map').insert([{ title_name: name }]).select()
// //       if (error) return alert('Add title failed: ' + error.message)
// //     } else {
// //       const titleId = Number(selectTitleForItem.value)
// //       const rawInput = (newItemInput.value || '').trim()
// //       if (!titleId || !rawInput) return alert('Missing fields')

// //       // If a candidate was selected via suggestion, use selectedCandidateId
// //       let toSaveId = selectedCandidateId || null

// //       // If user typed a numeric id directly (e.g., "123"), use that
// //       if (!toSaveId) {
// //         const numericMatch = rawInput.match(/\b(\d+)\b/)
// //         if (numericMatch) toSaveId = numericMatch[1]
// //       }

// //       // If still not found, attempt to search Email_Atm by name (only if not numeric)
// //       if (!toSaveId) {
// //         const { data: candData, error: candErr } = await supabase
// //           .from('Email_Atm')
// //           .select('Unique,"Candidate Name"')
// //           .ilike('Candidate Name', `%${rawInput}%`)
// //           .limit(5)

// //         if (candErr) console.warn('Candidate lookup failed', candErr)
// //         if (candData && candData.length === 1) toSaveId = String(candData[0].Unique)
// //       }

// //       if (!toSaveId) {
// //         const ok = confirm('Could not auto-resolve a single candidate ID from your input. Do you want to try saving the typed value as an ID anyway? (Only numeric IDs will be accepted)')
// //         if (!ok) return
// //         const numericMatch = rawInput.match(/\b(\d+)\b/)
// //         if (!numericMatch) return alert('No numeric ID found to save.')
// //         toSaveId = numericMatch[1]
// //       }

// //       const { data: insertData, error } = await supabase
// //         .from('Title_Items')
// //         .insert([{ title_id: titleId, item_name: String(toSaveId) }])
// //         .select()

// //       if (error) return alert('Add item failed: ' + error.message)

// //       // update sheet aggregate for the title
// //       await sendTitleMapToSheetByTitleId(titleId, 'update')
// //     }
// //     modalBackTM.classList.add('hidden')
// //     await loadTitles()
// //   } catch (err) {
// //     console.error(err)
// //     alert('Something went wrong: ' + (err.message || err))
// //   } finally {
// //     // reset selection
// //     selectedCandidateId = null
// //     destroySuggestionBox()
// //   }
// // })

// // function fillTitleDropdown() {
// //   selectTitleForItem.innerHTML = ''
// //   titles.forEach(t => {
// //     const opt = document.createElement('option')
// //     opt.value = t.id
// //     opt.textContent = t.title_name
// //     selectTitleForItem.appendChild(opt)
// //   })
// // }

// // /* LIST CLICKS: edit / delete title & items */
// // listEl.addEventListener('click', async (e) => {
// //   const editTitleBtn = e.target.closest('.edit-title-btn')
// //   const deleteTitleBtn = e.target.closest('.delete-title-btn')
// //   const editItemBtn = e.target.closest('.edit-item-btn')
// //   const deleteItemBtn = e.target.closest('.delete-item-btn')

// //   if (editTitleBtn) {
// //     const id = Number(editTitleBtn.dataset.id)
// //     const t = titles.find(x => x.id === id)
// //     if (!t) return
// //     currentEdit = { type: 'title', id }
// //     editFields.innerHTML = `<div class="row"><label>Title</label><input id="editTitleInput" value="${encodeHTML(t.title_name)}" /></div>`
// //     editBackTM.classList.remove('hidden')
// //     return
// //   }

// //   if (deleteTitleBtn) {
// //     const id = Number(deleteTitleBtn.dataset.id)
// //     if (!confirm('Delete this title and its items?')) return

// //     const { error } = await supabase.from('Title_Map').delete().eq('id', id)
// //     if (error) return alert('Delete title failed: ' + error.message)

// //     // also delete associated items (optional depending on FK config)
// //     await supabase.from('Title_Items').delete().eq('title_id', id)

// //     await loadTitles()
// //     return
// //   }

// //   if (editItemBtn) {
// //     const itemId = Number(editItemBtn.dataset.itemId)
// //     const titleId = Number(editItemBtn.dataset.titleId)
// //     const { data, error } = await supabase.from('Title_Items').select('*').eq('id', itemId).single()
// //     if (error) return alert('Failed loading item: ' + error.message)
// //     currentEdit = { type: 'item', id: itemId, title_id: titleId }
// //     editFields.innerHTML = `<div class="row"><label>Item (ID)</label><input id="editItemInput" value="${encodeHTML(data.item_name)}" /></div>`
// //     editBackTM.classList.remove('hidden')
// //     return
// //   }

// //   if (deleteItemBtn) {
// //     const itemId = Number(deleteItemBtn.dataset.itemId)
// //     const titleId = Number(deleteItemBtn.dataset.titleId)
// //     if (!confirm('Delete this ID?')) return
// //     const { error } = await supabase.from('Title_Items').delete().eq('id', itemId)
// //     if (error) return alert('Delete item failed: ' + error.message)
// //     // update the aggregated title row in sheet
// //     await sendTitleMapToSheetByTitleId(titleId, 'update')
// //     await loadTitles()
// //     return
// //   }
// // })

// // /* EDIT MODAL SAVE / CANCEL */
// // editCancel.addEventListener('click', () => editBackTM.classList.add('hidden'))
// // editSave.addEventListener('click', async () => {
// //   if (!currentEdit) return
// //   if (currentEdit.type === 'title') {
// //     const val = document.getElementById('editTitleInput').value
// //     const { error } = await supabase.from('Title_Map').update({ title_name: val }).eq('id', currentEdit.id)
// //     if (error) return alert('Update failed: ' + error.message)
// //     await sendTitleMapToSheetByTitleId(currentEdit.id, 'update')
// //   } else if (currentEdit.type === 'item') {
// //     const val = document.getElementById('editItemInput').value
// //     // we assume it's an ID string; update Title_Items.item_name
// //     const { error } = await supabase.from('Title_Items').update({ item_name: val }).eq('id', currentEdit.id)
// //     if (error) return alert('Update failed: ' + error.message)
// //     await sendTitleMapToSheetByTitleId(currentEdit.title_id, 'update')
// //   }
// //   currentEdit = null
// //   editBackTM.classList.add('hidden')
// //   await loadTitles()
// // })

// // /* ---------------- Candidate suggestion box (Title Map -> Add Item) ---------------- */

// // /**
// //  * ensureSuggestionBox: create suggestion dropdown under newItemInput when needed
// //  * destroySuggestionBox: remove it and clear selectedCandidateId
// //  * attach behaviour: typing queries supabase for Email_Atm by Unique (exact) OR Candidate Name (ilike)
// //  */
// // function ensureSuggestionBox() {
// //   if (suggestionBox) return
// //   suggestionBox = document.createElement('div')
// //   suggestionBox.className = 'suggestion-box'
// //   suggestionBox.style.position = 'absolute'
// //   suggestionBox.style.zIndex = '12000'
// //   suggestionBox.style.background = '#fff'
// //   suggestionBox.style.border = '1px solid #e2e8f0'
// //   suggestionBox.style.borderRadius = '8px'
// //   suggestionBox.style.boxShadow = '0 6px 20px rgba(2,6,23,0.08)'
// //   suggestionBox.style.maxHeight = '240px'
// //   suggestionBox.style.overflowY = 'auto'
// //   suggestionBox.style.minWidth = '280px'
// //   suggestionBox.style.padding = '8px'
// //   suggestionBox.style.display = 'none'

// //   // position under the newItemInput
// //   document.body.appendChild(suggestionBox)

// //   const reposition = () => {
// //     const rect = newItemInput.getBoundingClientRect()
// //     suggestionBox.style.left = `${rect.left + window.scrollX}px`
// //     suggestionBox.style.top = `${rect.bottom + window.scrollY + 6}px`
// //     suggestionBox.style.minWidth = `${rect.width}px`
// //   }
// //   window.addEventListener('resize', reposition)
// //   window.addEventListener('scroll', reposition)

// //   newItemInput.addEventListener('input', onNewItemInput)
// //   newItemInput.addEventListener('focus', onNewItemInput)
// //   newItemInput.addEventListener('blur', () => {
// //     // close after a short delay so clicks on suggestion register
// //     setTimeout(() => {
// //       suggestionBox.style.display = 'none'
// //     }, 150)
// //   })
// //   reposition()
// // }

// // function destroySuggestionBox() {
// //   if (!suggestionBox) return
// //   suggestionBox.remove()
// //   suggestionBox = null
// //   selectedCandidateId = null
// //   newItemInput.removeEventListener('input', onNewItemInput)
// //   newItemInput.removeEventListener('focus', onNewItemInput)
// // }

// // /* Debounced input handler */
// // async function onNewItemInput(e) {
// //   const q = (newItemInput.value || '').trim()
// //   selectedCandidateId = null // reset until user selects
// //   if (!q) {
// //     suggestionBox.style.display = 'none'
// //     return
// //   }

// //   // debounce
// //   if (suggestionDebounceTimer) clearTimeout(suggestionDebounceTimer)
// //   suggestionDebounceTimer = setTimeout(async () => {
// //     await showCandidateSuggestions(q)
// //   }, 250)
// // }

// // async function showCandidateSuggestions(q) {
// //   if (!suggestionBox) ensureSuggestionBox()
// //   suggestionBox.innerHTML = `<div class="muted">Searching...</div>`
// //   suggestionBox.style.display = 'block'

// //   const numericOnly = /^\d+$/.test(q)

// //   try {
// //     let results = []

// //     /* ------------------- NUMERIC SEARCH ------------------- */
// //     if (numericOnly) {
// //       // exact match
// //       const { data: exact } = await supabase
// //         .from('Email_Atm')
// //         .select('Unique,"Candidate Name"')
// //         .eq('Unique', Number(q))

// //       results = exact || []
// //     }

// //     /* -------------- ALWAYS SEARCH BY NAME AS WELL ----------- */
// //     const { data: nameMatches } = await supabase
// //       .from('Email_Atm')
// //       .select('Unique,"Candidate Name"')
// //       .ilike('Candidate Name', `%${q}%`)
// //       .limit(10)

// //     // Merge
// //     const map = new Map()
// //     ;(results || []).forEach(r => map.set(String(r.Unique), r))
// //     ;(nameMatches || []).forEach(r => {
// //       if (!map.has(String(r.Unique))) map.set(String(r.Unique), r)
// //     })

// //     const merged = Array.from(map.values()).slice(0, 10)

// //     if (!merged.length) {
// //       suggestionBox.innerHTML = `<div class="muted">No candidates found</div>`
// //       return
// //     }

// //     suggestionBox.innerHTML = merged
// //       .map(c => {
// //         const name = c["Candidate Name"] || "(no name)"
// //         return `
// //           <div class="suggestion-item" data-id="${c.Unique}"
// //             style="padding:8px;cursor:pointer;border-radius:6px;margin-bottom:4px;">
// //             <strong>${name}</strong>
// //             <div style="font-size:12px;color:#475569">ID: ${c.Unique}</div>
// //           </div>
// //         `
// //       })
// //       .join("")

// //     // Attach click handler
// //     suggestionBox.querySelectorAll('.suggestion-item').forEach(el => {
// //       el.addEventListener('click', () => {
// //         const id = el.dataset.id
// //         const name = el.querySelector('strong').textContent
// //         newItemInput.value = `${name} — ${id}`
// //         selectedCandidateId = id
// //         suggestionBox.style.display = 'none'
// //       })
// //     })

// //   } catch (err) {
// //     suggestionBox.innerHTML = `<div class="muted">Error searching: ${err.message}</div>`
// //   }
// // }



// // /* ---------------- Realtime & Sync to Sheet ---------------- */

// // /**
// //  * send aggregated Title_Map row (title_name + all item_names array) to Google Sheet
// //  * action: 'insert' | 'update' | 'delete'
// //  */
// // async function sendTitleMapToSheetByTitleId(titleId, action = 'update') {
// //   try {
// //     if (!titleId) return;

// //     const { data: tdata, error: terr } = await supabase.from('Title_Map').select('*').eq('id', titleId).single()
// //     if (terr && action !== 'delete') return console.error('Unable to fetch title row', terr)

// //     const { data: items } = await supabase.from('Title_Items').select('item_name,title_id').eq('title_id', titleId).order('id')

// //     const payload = {
// //       table: 'Title_Map',
// //       action,
// //       record: {
// //         id: titleId,                   // TitleID (Column A)
// //         ids: (items || []).map(i => i.item_name),   // IDs (Column B)
// //         title: tdata ? tdata.title_name : ''        // Title (Column C)
// //       }
// //     }

// //     await fetch(EDGE_SHEET_URL, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload)
// //     })

// //   } catch (err) {
// //     console.error('sendTitleMapToSheet error', err)
// //   }
// // }

// // /* init realtime subscribers for Title_Map and Title_Items */
// // function initTitleMapRealtime() {
// //   supabase
// //     .channel('Title_Map_changes')
// //     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Title_Map' }, payload => {
// //       sendTitleMapToSheetByTitleId(payload.new.id, 'insert')
// //     })
// //     .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Title_Map' }, payload => {
// //       sendTitleMapToSheetByTitleId(payload.new.id, 'update')
// //     })
// //     .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'Title_Map' }, payload => {
// //       fetch(EDGE_SHEET_URL, {
// //         method: 'POST',
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           table: 'Title_Map',
// //           action: 'delete',
// //           record: { id: payload.old.id }
// //         })
// //       })
// //     })
// //     .on('postgres_changes', { event: '*', schema: 'public', table: 'Title_Items' }, payload => {
// //       const idTitle = (payload.new && payload.new.title_id) || (payload.old && payload.old.title_id)
// //       if (idTitle) sendTitleMapToSheetByTitleId(idTitle, 'update')
// //     })
// //     .subscribe()
// // }

// // /* Email_Atm realtime -> sheet (existing) */
// // function initRealtimeSyncToSheet() {
// //   supabase
// //     .channel('email_atm_changes')
// //     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Email_Atm' }, payload => {
// //       fetch(EDGE_SHEET_URL, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ table: 'Candidates', action: 'insert', record: payload.new }) })
// //     })
// //     .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Email_Atm' }, payload => {
// //       fetch(EDGE_SHEET_URL, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ table: 'Candidates', action: 'update', record: payload.new }) })
// //     })
// //     .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'Email_Atm' }, payload => {
// //       fetch(EDGE_SHEET_URL, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ table: 'Candidates', action: 'delete', record: { Unique: payload.old.Unique } }) })
// //     })
// //     .subscribe()
// // }

// // /* ---------------- Init ---------------- */
// // testConnection()
// // loadData()
// // initRealtimeSyncToSheet()
// // initTitleMapRealtime()
// // script.js (full updated code matching your HTML, Option A: ids as comma-separated TEXT)

// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// /* ---------------- Supabase config ---------------- */
// const SUPABASE_URL = 'https://oykgmkoplpcbwohmvvfh.supabase.co'
// const SUPABASE_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a2dta29wbHBjYndvaG12dmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4ODg0NjksImV4cCI6MjA3ODQ2NDQ2OX0.Uev5aXttg55gZYdMjiS8SahYB3BXULNTVvUEgH6khdk'

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
//   auth: { persistSession: false }
// })

// /*---------------- Webhook (Google Apps Script) ----------------*/
// const EDGE_SHEET_URL =
//   'https://oykgmkoplpcbwohmvvfh.supabase.co/functions/v1/quick-endpoint'

// /* ---------------- DOM references ---------------- */
// const statusEl = document.getElementById('connectionStatus')
// const tableBody = document.querySelector('#dataTable tbody')
// const form = document.getElementById('candidateForm')
// const submitBtn = document.getElementById('submitBtn')
// const cancelBtn = document.getElementById('cancelEditBtn')
// const searchEl = document.getElementById('searchInput')
// const openFormBtn = document.getElementById('openFormBtn')

// // Title Map
// const titleMapBtn = document.getElementById('titleMapBtn')
// const titleMapPopup = document.getElementById('titleMapPopup')
// const closeTitleMap = document.getElementById('closeTitleMap')
// const listEl = document.getElementById('list')
// const searchInputTM = document.getElementById('searchInputTM')
// const openAddBtnTM = document.getElementById('openAddBtnTM')
// const modalBackTM = document.getElementById('modalBack')
// const editBackTM = document.getElementById('editBack')

// const modeSelect = document.getElementById('modeSelect')
// const newTitleInput = document.getElementById('newTitleInput')
// const newItemInput = document.getElementById('newItemInput')
// const selectTitleForItem = document.getElementById('selectTitleForItem')
// const suggestionContainer = document.getElementById('suggestionContainer')
// const submitModalBtn = document.getElementById('submitModalBtn')
// const cancelBtnTM = document.getElementById('cancelBtnTM')
// const editFields = document.getElementById('editFields')
// const editSave = document.getElementById('editSave')
// const editCancel = document.getElementById('editCancel')

// /* ---------------- State ---------------- */
// let allRows = []
// let editingId = null           // for candidate editing
// let titles = []                // local cache of Title_Map rows
// let currentEdit = null         // { type: 'title'|'item', id: titleid, itemIndex? }
// let selectedCandidateId = null // for suggestion when adding item
// let suggestionTimer = null

// /* ---------------- Helpers ---------------- */
// const encodeHTML = (str = '') =>
//   String(str).replace(/[&<>"'`=\/]/g, s =>
//     ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' }[s])
//   )

// function setStatusOk(text) {
//   if (!statusEl) return
//   statusEl.classList.remove('error')
//   statusEl.classList.add('ok')
//   statusEl.textContent = `✅ ${text}`
// }
// function setStatusErr(text) {
//   if (!statusEl) return
//   statusEl.classList.remove('ok')
//   statusEl.classList.add('error')
//   statusEl.textContent = `❌ ${text}`
// }

// /* ---------------- Candidates (unchanged) ---------------- */
// async function testConnection() {
//   try {
//     const { count, error } = await supabase.from('Email_Atm').select('*', { count: 'exact', head: true })
//     if (error) throw error
//     setStatusOk(`Connected to Supabase (${count} records)`)
//   } catch (e) {
//     setStatusErr(`Failed to connect: ${e.message}`)
//   }
// }

// async function loadData() {
//   const { data, error } = await supabase.from('Email_Atm').select('*').order('Unique')
//   if (error) return setStatusErr(`Query failed: ${error.message}`)
//   allRows = data || []
//   renderTable(allRows)
// }

// function renderTable(rows) {
//   if (!tableBody) return
//   tableBody.innerHTML = ''
//   rows.forEach(row => {
//     const tr = document.createElement('tr')
//     tr.innerHTML = `
//       <td>${row.Unique}</td>
//       <td>${encodeHTML(row['Candidate Name'] || '')}</td>
//       <td>${encodeHTML(row['Contact No'] || '')}</td>
//       <td>${encodeHTML(row.Email || '')}</td>
//       <td>${encodeHTML(row.Skills || '')}</td>
//       <td>${encodeHTML(row['Visa status'] || '')}</td>
//       <td>${encodeHTML(row['Skype ID'] || '')}</td>
//       <td>${encodeHTML(row['Current Location'] || '')}</td>
//       <td>${encodeHTML(row['DOB(MM/DD)'] || '')}</td>
//       <td>${encodeHTML(row['Relocation (Yes/No)'] || '')}</td>
//       <td>${encodeHTML(row['Onsite or Remote:'] || '')}</td>
//       <td>${encodeHTML(row['Bachelor: University//year of completion'] || '')}</td>
//       <td>${encodeHTML(row.Title || '')}</td>
//       <td>${encodeHTML(row.Rate || '')}</td>
//       <td>${encodeHTML(row['Recruiter name'] || '')}</td>
//       <td class="actions">
//         <button class="btn secondary btn-edit" data-id="${row.Unique}"> Edit </button>
//         <button class="btn danger btn-delete" data-id="${row.Unique}" data-name="${encodeHTML(row['Candidate Name'] || '')}"> Delete </button>
//       </td>
//     `
//     tableBody.appendChild(tr)
//   })
// }

// /* Candidate search */
// if (searchEl) {
//   searchEl.addEventListener('input', () => {
//     const q = searchEl.value.toLowerCase()
//     if (!q) return renderTable(allRows)
//     const filtered = allRows.filter(r => {
//       return [r['Candidate Name'], r.Email, r.Skills, r.Title, r['Recruiter name'], r['Current Location']]
//         .map(v => (v || '').toString().toLowerCase())
//         .some(v => v.includes(q))
//     })
//     renderTable(filtered)
//   })
// }

// /* Candidate add/edit/delete handlers */
// if (openFormBtn) openFormBtn.addEventListener("click", () => {
//   editingId = null
//   form.reset()
//   submitBtn.textContent = "Add Candidate"
//   cancelBtn.classList.add("hidden")
//   form.classList.remove("hidden")
//   form.scrollIntoView({ behavior: "smooth" })
// })

// if (cancelBtn) cancelBtn.addEventListener("click", () => {
//   form.classList.add("hidden")
//   form.reset()
//   editingId = null
// })

// document.addEventListener('click', async (e) => {
//   const btn = e.target.closest && e.target.closest('button')
//   if (!btn) return
//   // candidate edit/delete
//   if (btn.classList.contains('btn-edit') && btn.closest('tr')) {
//     const id = Number(btn.dataset.id)
//     if (!id) return
//     const { data, error } = await supabase.from('Email_Atm').select('*').eq('Unique', id).single()
//     if (error) return alert('Error loading record: ' + error.message)
//     editingId = id; form.classList.remove('hidden')
//     const set = (idSelector, v = '') => { const el = document.getElementById(idSelector); if (el) el.value = v || '' }
//     set('candidateName', data['Candidate Name'])
//     set('contactNo', data['Contact No'])
//     set('email', data.Email)
//     set('skills', data.Skills)
//     set('visaStatus', data['Visa status'])
//     set('skypeId', data['Skype ID'])
//     set('currentLocation', data['Current Location'])
//     set('dob', data['DOB(MM/DD)'])
//     set('relocation', data['Relocation (Yes/No)'])
//     set('onsiteRemote', data['Onsite or Remote:'])
//     set('bachelor', data['Bachelor: University//year of completion'])
//     set('masters', data["Master's /university/ year of completion"])
//     set('ssn', data['SSN no. last 4 digit'])
//     set('linkedin', data.LinkedIn)
//     set('ppNo', data['PP No'])
//     set('totalExp', data['Total Exp'])
//     set('expUS', data['Total years of Exp in US'])
//     set('availProject', data['Availability for Project'])
//     set('availInterview', data['Availability for Interview'])
//     set('bestTime', data['Best Time to reach'])
//     set('resume', data.Resume)
//     set('dl', data.DL)
//     set('title', data.Title)
//     set('rate', data.Rate)
//     set('recruiterName', data['Recruiter name'])
//     set('recruiterEmail', data['Recruiter email'])
//     set('recruiterPhone', data['Recruiter Phone'])
//     set('match', data.Match)
//     submitBtn.textContent = "Update Candidate"
//     cancelBtn.classList.remove("hidden")
//     form.scrollIntoView({ behavior: "smooth" })
//     return
//   }

//   if (btn.classList.contains('btn-delete') && btn.closest('tr')) {
//     const id = Number(btn.dataset.id)
//     const name = btn.dataset.name || 'this candidate'
//     const modal = document.getElementById('deleteModal')
//     document.getElementById('deleteText').textContent = `Are you sure you want to delete "${name}"?`
//     modal.classList.remove('hidden')
//     // store pending id in dataset
//     modal.dataset.pendingDelete = id
//     return
//   }
// })

// const confirmDeleteBtn = document.getElementById('confirmDeleteBtn')
// if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', async () => {
//   const modal = document.getElementById('deleteModal')
//   const id = Number(modal.dataset.pendingDelete)
//   if (!id) return
//   const { error } = await supabase.from('Email_Atm').delete().eq('Unique', id)
//   if (error) alert('Delete failed: ' + error.message)
//   modal.classList.add('hidden')
//   await loadData()
// })
// const cancelDeleteBtn = document.getElementById('cancelDeleteBtn')
// if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', () => document.getElementById('deleteModal').classList.add('hidden'))

// if (form) {
//   form.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     const record = {
//       'Candidate Name': candidateName.value,
//       'Contact No': contactNo.value,
//       Email: email.value,
//       Skills: skills.value,
//       'Visa status': visaStatus.value,
//       'Skype ID': skypeId.value,
//       'Current Location': currentLocation.value,
//       'DOB(MM/DD)': dob.value,
//       'Relocation (Yes/No)': relocation.value,
//       'Onsite or Remote:': onsiteRemote.value,
//       'Bachelor: University//year of completion': bachelor.value,
//       "Master's /university/ year of completion": masters.value,
//       'SSN no. last 4 digit': ssn.value,
//       LinkedIn: linkedin.value,
//       'PP No': ppNo.value,
//       'Total Exp': totalExp.value,
//       'Total years of Exp in US': expUS.value,
//       'Availability for Project': availProject.value,
//       'Availability for Interview': availInterview.value,
//       'Best Time to reach': bestTime.value,
//       Resume: resume.value,
//       DL: dl.value,
//       Title: title.value,
//       Rate: rate.value,
//       'Recruiter name': recruiterName.value,
//       'Recruiter email': recruiterEmail.value,
//       'Recruiter Phone': recruiterPhone.value,
//       Match: match.value
//     }

//     try {
//       if (editingId) {
//         const { error } = await supabase.from('Email_Atm').update(record).eq('Unique', editingId)
//         if (error) throw error
//         alert("Candidate Updated!")
//       } else {
//         const { error } = await supabase.from('Email_Atm').insert([record])
//         if (error) throw error
//         alert("Candidate Added!")
//       }
//       editingId = null
//       form.reset()
//       form.classList.add('hidden')
//       cancelBtn.classList.add('hidden')
//       await loadData()
//     } catch (err) {
//       alert('Error saving candidate: ' + (err.message || err))
//     }
//   })
// }

// /* ---------------- Title Map logic (Option A: ids stored in Title_Map.ids as comma-string) ---------------- */

// titleMapBtn.addEventListener('click', async () => {
//   titleMapPopup.classList.remove('hidden')
//   await loadTitles()
// })
// closeTitleMap.addEventListener('click', () => titleMapPopup.classList.add('hidden'))

// // Open add modal
// openAddBtnTM.addEventListener('click', () => {
//   editingId = null
//   // set default mode to title
//   modeSelect.value = 'title'
//   onModeChange()
//   newTitleInput.value = ''
//   newItemInput.value = ''
//   fillTitleDropdown()
//   modalBackTM.classList.remove('hidden')
// })
// cancelBtnTM.addEventListener('click', () => modalBackTM.classList.add('hidden'))

// // Mode handling: show/hide fields
// function onModeChange() {
//   const mode = modeSelect.value
//   const titleFields = document.getElementById('titleFields')
//   const itemFields = document.getElementById('itemFields')
//   const itemNameRow = document.getElementById('itemNameRow')
//   if (mode === 'title') {
//     titleFields.style.display = 'block'
//     itemFields.style.display = 'none'
//     itemNameRow.style.display = 'none'
//     destroySuggestions()
//   } else {
//     titleFields.style.display = 'none'
//     itemFields.style.display = 'block'
//     itemNameRow.style.display = 'flex'
//     ensureSuggestionHandlers()
//   }
// }
// modeSelect.addEventListener('change', onModeChange)

// // Load all titles from Supabase (uses titleid)
// async function loadTitles() {
//   if (!listEl) return
//   listEl.innerHTML = '<div class="muted">Loading titles...</div>'
//   const { data, error } = await supabase.from('Title_Map').select('*').order('titleid')
//   if (error) {
//     listEl.innerHTML = `<div class="muted">Error loading titles: ${error.message}</div>`
//     console.error('loadTitles error', error)
//     return
//   }
//   titles = (data || []).map(t => ({
//     titleid: t.titleid,
//     title: t.title || '',
//     ids: t.ids || ''
//   }))
//   renderTitles()
//   fillTitleDropdown()
// }

// function renderTitles(filter = '') {
//   if (!listEl) return
//   listEl.innerHTML = ''
//   const filtered = titles.filter(t => (t.title || '').toLowerCase().includes(filter.toLowerCase()))
//   if (!filtered.length) {
//     listEl.innerHTML = '<div class="muted">No titles yet</div>'
//     return
//   }
//   filtered.forEach(t => {
//     const el = document.createElement('div')
//     el.className = 'tile'
//     el.innerHTML = `
//       <div class="title-left">
//         <div class="title-name">${encodeHTML(t.title)}</div>
//         <div class="itemsRow">IDs: ${encodeHTML(t.ids || '(none)')}</div>
//       </div>
//       <div class="tileHeader">
//         <div>
//           <div class="meta">ID: ${t.titleid}</div>
//         </div>
//         <div class="title-actions">
//           <button class="btn secondary edit-title-btn" data-id="${t.titleid}">Edit</button>
//           <button class="btn danger delete-title-btn" data-id="${t.titleid}">Delete</button>
//         </div>
//       </div>
//     `
//     listEl.appendChild(el)
//   })
// }

// // Fill dropdown for Add Item mode
// function fillTitleDropdown() {
//   if (!selectTitleForItem) return
//   selectTitleForItem.innerHTML = ''
//   const opt = document.createElement('option')
//   opt.value = ''
//   opt.textContent = '-- Select title --'
//   selectTitleForItem.appendChild(opt)
//   titles.forEach(t => {
//     const o = document.createElement('option')
//     o.value = t.titleid
//     o.textContent = t.title
//     selectTitleForItem.appendChild(o)
//   })
// }

// /* Submit modal - add title OR add item */
// submitModalBtn.addEventListener('click', async () => {
//   const mode = modeSelect.value
//   try {
//     if (mode === 'title') {
//       const name = (newTitleInput.value || '').trim()
//       if (!name) return alert('Enter title name')
//       const { data, error } = await supabase.from('Title_Map').insert([{ title: name, ids: '' }]).select()
//       if (error) return alert('Add title failed: ' + error.message)
//       const newId = data && data[0] && data[0].titleid
//       if (newId) await sendTitleMapToSheetByTitleId(newId, 'insert')
//     } else {
//       // add item to existing title (append numeric ID)
//       const titleId = Number(selectTitleForItem.value)
//       const raw = (newItemInput.value || '').trim()
//       if (!titleId || !raw) return alert('Select title and enter ID or select suggestion')

//       // prefer selectedCandidateId if user selected suggestion
//       let idToSave = selectedCandidateId || null
//       if (!idToSave) {
//         const match = raw.match(/\b(\d+)\b/)
//         if (match) idToSave = match[1]
//       }
//       if (!idToSave) return alert('Could not determine numeric ID. Type or select a numeric ID.')

//       // fetch current row and append
//       const { data: tdata, error: terr } = await supabase.from('Title_Map').select('ids').eq('titleid', titleId).single()
//       if (terr) return alert('Unable to fetch title row: ' + terr.message)
//       const existing = tdata.ids ? tdata.ids.split(',').map(s => s.trim()).filter(s => s) : []
//       // avoid duplicate
//       if (!existing.includes(String(idToSave))) existing.push(String(idToSave))
//       const newIds = existing.join(',')
//       const { error } = await supabase.from('Title_Map').update({ ids: newIds }).eq('titleid', titleId)
//       if (error) return alert('Add item failed: ' + error.message)
//       await sendTitleMapToSheetByTitleId(titleId, 'update')
//     }
//     modalBackTM.classList.add('hidden')
//     selectedCandidateId = null
//     destroySuggestions()
//     await loadTitles()
//   } catch (err) {
//     console.error(err)
//     alert('Something went wrong: ' + (err.message || err))
//   }
// })

// /* LIST clicks: edit / delete (uses titleid) */
// listEl.addEventListener('click', async (e) => {
//   const editBtn = e.target.closest('.edit-title-btn')
//   const delBtn = e.target.closest('.delete-title-btn')
//   if (editBtn) {
//     const id = Number(editBtn.dataset.id)
//     const t = titles.find(x => x.titleid === id)
//     if (!t) return
//     currentEdit = { type: 'title', id }
//     // show edit modal fields: allow editing title and entire ids text
//     editFields.innerHTML = `
//       <div class="row"><label>Title</label><input id="editTitleInput" value="${encodeHTML(t.title)}" class="input" /></div>
//       <div class="row"><label>IDs (comma separated)</label><input id="editIdsInput" value="${encodeHTML(t.ids || '')}" class="input" /></div>
//     `
//     editBackTM.classList.remove('hidden')
//     return
//   }
//   if (delBtn) {
//     const id = Number(delBtn.dataset.id)
//     if (!confirm('Delete this title and its IDs?')) return
//     const { error } = await supabase.from('Title_Map').delete().eq('titleid', id)
//     if (error) return alert('Delete failed: ' + error.message)
//     await sendTitleMapToSheetByTitleId(id, 'delete')
//     await loadTitles()
//     return
//   }
// })

// /* Edit modal save/cancel */
// editCancel.addEventListener('click', () => {
//   editBackTM.classList.add('hidden')
//   currentEdit = null
// })
// editSave.addEventListener('click', async () => {
//   if (!currentEdit) return
//   const titleVal = document.getElementById('editTitleInput').value.trim()
//   const idsVal = document.getElementById('editIdsInput').value.trim()
//   try {
//     const { error } = await supabase.from('Title_Map').update({ title: titleVal, ids: idsVal }).eq('titleid', currentEdit.id)
//     if (error) return alert('Update failed: ' + error.message)
//     await sendTitleMapToSheetByTitleId(currentEdit.id, 'update')
//     editBackTM.classList.add('hidden')
//     currentEdit = null
//     await loadTitles()
//   } catch (err) {
//     alert('Failed updating: ' + (err.message || err))
//   }
// })

// /* ---------------- Suggestion box for newItemInput ---------------- */
// function ensureSuggestionHandlers() {
//   if (!newItemInput) return
//   newItemInput.addEventListener('input', onNewItemInput)
//   newItemInput.addEventListener('focus', onNewItemInput)
//   newItemInput.addEventListener('blur', () => {
//     // hide after short delay to allow click
//     setTimeout(() => { if (suggestionContainer) suggestionContainer.innerHTML = '' }, 150)
//   })
// }
// function destroySuggestions() {
//   if (!newItemInput) return
//   newItemInput.removeEventListener('input', onNewItemInput)
//   newItemInput.removeEventListener('focus', onNewItemInput)
//   if (suggestionContainer) suggestionContainer.innerHTML = ''
//   selectedCandidateId = null
// }
// async function onNewItemInput() {
//   const q = (newItemInput.value || '').trim()
//   selectedCandidateId = null
//   if (!q) {
//     if (suggestionContainer) suggestionContainer.innerHTML = ''
//     return
//   }
//   if (suggestionTimer) clearTimeout(suggestionTimer)
//   suggestionTimer = setTimeout(() => showSuggestions(q), 250)
// }
// async function showSuggestions(q) {
//   if (!suggestionContainer) return
//   suggestionContainer.innerHTML = '<div class="muted">Searching...</div>'
//   try {
//     // numeric exact lookup by Unique
//     let results = []
//     if (/^\d+$/.test(q)) {
//       const { data: exact } = await supabase.from('Email_Atm').select('Unique,"Candidate Name"').eq('Unique', Number(q)).limit(5)
//       results = exact || []
//     }
//     // name search
//     const { data: byName } = await supabase.from('Email_Atm').select('Unique,"Candidate Name"').ilike('Candidate Name', `%${q}%`).limit(10)
//     const map = new Map()
//     ;(results || []).forEach(r => map.set(String(r.Unique), r))
//     ;(byName || []).forEach(r => { if (!map.has(String(r.Unique))) map.set(String(r.Unique), r) })
//     const merged = Array.from(map.values()).slice(0, 10)
//     if (!merged.length) {
//       suggestionContainer.innerHTML = '<div class="muted">No candidates found</div>'
//       return
//     }
//     suggestionContainer.innerHTML = merged.map(c => `
//       <div class="suggestion-item" data-id="${c.Unique}" style="padding:6px;cursor:pointer;border-radius:6px;">
//         <strong>${encodeHTML(c['Candidate Name'] || '(no name)')}</strong>
//         <div style="font-size:12px;color:#666">ID: ${c.Unique}</div>
//       </div>
//     `).join('')
//     // attach click
//     suggestionContainer.querySelectorAll('.suggestion-item').forEach(el => {
//       el.addEventListener('click', () => {
//         const id = el.dataset.id
//         const name = el.querySelector('strong').textContent
//         newItemInput.value = `${name} — ${id}`
//         selectedCandidateId = id
//         suggestionContainer.innerHTML = ''
//       })
//     })
//   } catch (err) {
//     suggestionContainer.innerHTML = `<div class="muted">Error: ${err.message}</div>`
//   }
// }

// async function sendTitleMapToSheetByTitleId(titleId, action = 'update') {
//   try {
//     let row = null;

//     if (action !== 'delete') {
//       const { data, error } = await supabase
//         .from('Title_Map')
//         .select('*')
//         .eq('titleid', titleId)
//         .single();

//       if (error) {
//         console.error("fetch failed", error);
//         return;
//       }

//       row = data;
//     }

//     const idsArray = row?.ids
//       ? row.ids.split(',').map(s => s.trim()).filter(Boolean)
//       : [];

//     const payload = {
//       table: "Title_Map",
//       action,
//       record: {
//         id: titleId,
//         ids: idsArray,
//         title: row ? row.title : ""
//       }
//     };

//     // ⭐ MUST SEND RAW JSON TO APPS SCRIPT
//     await fetch(EDGE_SHEET_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });

//   } catch (err) {
//     console.error("Sheet sync error:", err);
//   }
// }
// /* ---------------- Init ---------------- */
// testConnection()
// loadData()












/* script.js - FINAL updated version
   Works with the HTML the user provided.
*/

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

/* ---------------- Supabase config ---------------- */
const SUPABASE_URL = 'https://oykgmkoplpcbwohmvvfh.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a2dta29wbHBjYndvaG12dmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4ODg0NjksImV4cCI6MjA3ODQ2NDQ2OX0.Uev5aXttg55gZYdMjiS8SahYB3BXULNTVvUEgH6khdk'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
})

/*---------------- Webhook (Google Apps Script) ----------------*/
const EDGE_SHEET_URL = 'https://oykgmkoplpcbwohmvvfh.supabase.co/functions/v1/quick-endpoint'

/* ---------------- DOM references ---------------- */
const statusEl = document.getElementById('connectionStatus')
const tableBody = document.querySelector('#dataTable tbody')
const form = document.getElementById('candidateForm')
const submitBtn = document.getElementById('submitBtn')
const cancelBtn = document.getElementById('cancelEditBtn')
const searchEl = document.getElementById('searchInput')
const openFormBtn = document.getElementById('openFormBtn')

// Title Map
const titleMapBtn = document.getElementById('titleMapBtn')
const titleMapPopup = document.getElementById('titleMapPopup')
const closeTitleMap = document.getElementById('closeTitleMap')
const listEl = document.getElementById('list')
const searchInputTM = document.getElementById('searchInputTM')
const openAddBtnTM = document.getElementById('openAddBtnTM')
const modalBackTM = document.getElementById('modalBack')
const editBackTM = document.getElementById('editBack')

const modeSelect = document.getElementById('modeSelect')
const newTitleInput = document.getElementById('newTitleInput')
const newItemInput = document.getElementById('newItemInput')
const selectTitleForItem = document.getElementById('selectTitleForItem')
const suggestionContainer = document.getElementById('suggestionContainer')
const submitModalBtn = document.getElementById('submitModalBtn')
const cancelBtnTM = document.getElementById('cancelBtnTM')
const editFields = document.getElementById('editFields')
const editSave = document.getElementById('editSave')
const editCancel = document.getElementById('editCancel')

/* ---------------- State ---------------- */
let allRows = []
let editingId = null           // for candidate editing
let titles = []                // local cache of Title_Map rows
let currentEdit = null         // { type: 'title'|'item', id: titleid }
let selectedCandidateId = null // for suggestion when adding item
let suggestionTimer = null

/* ---------------- Helpers ---------------- */
const encodeHTML = (str = '') =>
  String(str).replace(/[&<>"'`=\/]/g, s =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' }[s])
  )

function setStatusOk(text) {
  if (!statusEl) return
  statusEl.classList.remove('error')
  statusEl.classList.add('ok')
  statusEl.textContent = `✅ ${text}`
}
function setStatusErr(text) {
  if (!statusEl) return
  statusEl.classList.remove('ok')
  statusEl.classList.add('error')
  statusEl.textContent = `❌ ${text}`
}

/* ---------------- Candidates ---------------- */
async function testConnection() {
  try {
    const { count, error } = await supabase.from('Email_Atm').select('*', { count: 'exact', head: true })
    if (error) throw error
    setStatusOk(`Connected to Supabase (${count} records)`)
  } catch (e) {
    setStatusErr(`Failed to connect: ${e.message}`)
  }
}

async function loadData() {
  try {
    const { data, error } = await supabase.from('Email_Atm').select('*').order('Unique')
    if (error) return setStatusErr(`Query failed: ${error.message}`)
    allRows = data || []
    renderTable(allRows)
  } catch (err) {
    console.error('loadData error', err)
  }
}

function renderTable(rows) {
  if (!tableBody) return
  tableBody.innerHTML = ''
  rows.forEach(row => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${row.Unique}</td>
      <td>${encodeHTML(row['Candidate Name'] || '')}</td>
      <td>${encodeHTML(row['Contact No'] || '')}</td>
      <td>${encodeHTML(row.Email || '')}</td>
      <td>${encodeHTML(row.Skills || '')}</td>
      <td>${encodeHTML(row['Visa status'] || '')}</td>
      <td>${encodeHTML(row['Skype ID'] || '')}</td>
      <td>${encodeHTML(row['Current Location'] || '')}</td>
      <td>${encodeHTML(row['DOB(MM/DD)'] || '')}</td>
      <td>${encodeHTML(row['Relocation (Yes/No)'] || '')}</td>
      <td>${encodeHTML(row['Onsite or Remote:'] || '')}</td>
      <td>${encodeHTML(row['Bachelor: University//year of completion'] || '')}</td>
      <td>${encodeHTML(row.Title || '')}</td>
      <td>${encodeHTML(row.Rate || '')}</td>
      <td>${encodeHTML(row['Recruiter name'] || '')}</td>
      <td class="actions">
        <button class="btn secondary btn-edit" data-id="${row.Unique}"> Edit </button>
        <button class="btn danger btn-delete" data-id="${row.Unique}" data-name="${encodeHTML(row['Candidate Name'] || '')}"> Delete </button>
      </td>
    `
    tableBody.appendChild(tr)
  })
}

/* Candidate search */
if (searchEl) {
  searchEl.addEventListener('input', () => {
    const q = searchEl.value.toLowerCase()
    if (!q) return renderTable(allRows)
    const filtered = allRows.filter(r => {
      return [r['Candidate Name'], r.Email, r.Skills, r.Title, r['Recruiter name'], r['Current Location']]
        .map(v => (v || '').toString().toLowerCase())
        .some(v => v.includes(q))
    })
    renderTable(filtered)
  })
}

/* Candidate add/edit/delete handlers */
if (openFormBtn) openFormBtn.addEventListener("click", () => {
  editingId = null
  if (form) form.reset()
  if (submitBtn) submitBtn.textContent = "Add Candidate"
  if (cancelBtn) cancelBtn.classList.add("hidden")
  if (form) {
    form.classList.remove("hidden")
    form.scrollIntoView({ behavior: "smooth" })
  }
})

if (cancelBtn) cancelBtn.addEventListener("click", () => {
  if (form) form.classList.add("hidden")
  if (form) form.reset()
  editingId = null
})

document.addEventListener('click', async (e) => {
  const btn = e.target.closest && e.target.closest('button')
  if (!btn) return

  // candidate edit
  if (btn.classList.contains('btn-edit') && btn.closest('tr')) {
    const id = Number(btn.dataset.id)
    if (!id) return
    const { data, error } = await supabase.from('Email_Atm').select('*').eq('Unique', id).single()
    if (error) return alert('Error loading record: ' + error.message)
    editingId = id
    if (form) form.classList.remove('hidden')
    const set = (idSelector, v = '') => { const el = document.getElementById(idSelector); if (el) el.value = v || '' }
    set('candidateName', data['Candidate Name'])
    set('contactNo', data['Contact No'])
    set('email', data.Email)
    set('skills', data.Skills)
    set('visaStatus', data['Visa status'])
    set('skypeId', data['Skype ID'])
    set('currentLocation', data['Current Location'])
    set('dob', data['DOB(MM/DD)'])
    set('relocation', data['Relocation (Yes/No)'])
    set('onsiteRemote', data['Onsite or Remote:'])
    set('bachelor', data['Bachelor: University//year of completion'])
    set('masters', data["Master's /university/ year of completion"])
    set('ssn', data['SSN no. last 4 digit'])
    set('linkedin', data.LinkedIn)
    set('ppNo', data['PP No'])
    set('totalExp', data['Total Exp'])
    set('expUS', data['Total years of Exp in US'])
    set('availProject', data['Availability for Project'])
    set('availInterview', data['Availability for Interview'])
    set('bestTime', data['Best Time to reach'])
    set('resume', data.Resume)
    set('dl', data.DL)
    set('title', data.Title)
    set('rate', data.Rate)
    set('recruiterName', data['Recruiter name'])
    set('recruiterEmail', data['Recruiter email'])
    set('recruiterPhone', data['Recruiter Phone'])
    set('match', data.Match)
    if (submitBtn) submitBtn.textContent = "Update Candidate"
    if (cancelBtn) cancelBtn.classList.remove("hidden")
    if (form) form.scrollIntoView({ behavior: "smooth" })
    return
  }

  // candidate delete (show modal)
  if (btn.classList.contains('btn-delete') && btn.closest('tr')) {
    const id = Number(btn.dataset.id)
    const name = btn.dataset.name || 'this candidate'
    const modal = document.getElementById('deleteModal')
    if (!modal) return
    const dt = document.getElementById('deleteText')
    if (dt) dt.textContent = `Are you sure you want to delete "${name}"?`
    modal.classList.remove('hidden')
    modal.dataset.pendingDelete = id
    return
  }
})

const confirmDeleteBtn = document.getElementById('confirmDeleteBtn')
if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', async () => {
  const modal = document.getElementById('deleteModal')
  if (!modal) return
  const id = Number(modal.dataset.pendingDelete)
  if (!id) return
  try {
    const { error } = await supabase.from('Email_Atm').delete().eq('Unique', id)
    if (error) throw error

    // send delete to sheet (send minimal record with Unique)
    await fetch(EDGE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'Candidates', action: 'delete', record: { Unique: id } })
    })

    modal.classList.add('hidden')
    await loadData()
  } catch (err) {
    alert('Delete failed: ' + (err.message || err))
  }
})
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn')
if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', () => {
  const modal = document.getElementById('deleteModal')
  if (modal) modal.classList.add('hidden')
})

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    // build record object from fields (only fields that exist)
    const getVal = id => { const el = document.getElementById(id); return el ? el.value : '' }
    const record = {
      'Candidate Name': getVal('candidateName'),
      'Contact No': getVal('contactNo'),
      Email: getVal('email'),
      Skills: getVal('skills'),
      'Visa status': getVal('visaStatus'),
      'Skype ID': getVal('skypeId'),
      'Current Location': getVal('currentLocation'),
      'DOB(MM/DD)': getVal('dob'),
      'Relocation (Yes/No)': getVal('relocation'),
      'Onsite or Remote:': getVal('onsiteRemote'),
      'Bachelor: University//year of completion': getVal('bachelor'),
      "Master's /university/ year of completion": getVal('masters'),
      'SSN no. last 4 digit': getVal('ssn'),
      LinkedIn: getVal('linkedin'),
      'PP No': getVal('ppNo'),
      'Total Exp': getVal('totalExp'),
      'Total years of Exp in US': getVal('expUS'),
      'Availability for Project': getVal('availProject'),
      'Availability for Interview': getVal('availInterview'),
      'Best Time to reach': getVal('bestTime'),
      Resume: getVal('resume'),
      DL: getVal('dl'),
      Title: getVal('title'),
      Rate: getVal('rate'),
      'Recruiter name': getVal('recruiterName'),
      'Recruiter email': getVal('recruiterEmail'),
      'Recruiter Phone': getVal('recruiterPhone'),
      Match: getVal('match')
    }

    try {
      if (editingId) {
        // update and get updated row back
        const { data, error } = await supabase.from('Email_Atm').update(record).eq('Unique', editingId).select().single()
        if (error) throw error

        // send updated row to sheet
        await fetch(EDGE_SHEET_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ table: 'Candidates', action: 'update', record: data })
        })

        alert('Candidate Updated!')
      } else {
        // insert and get inserted row
        const { data, error } = await supabase.from('Email_Atm').insert([record]).select().single()
        if (error) throw error

        // send inserted row to sheet
        await fetch(EDGE_SHEET_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ table: 'Candidates', action: 'insert', record: data })
        })

        alert('Candidate Added!')
      }

      editingId = null
      form.reset()
      form.classList.add('hidden')
      if (cancelBtn) cancelBtn.classList.add('hidden')
      await loadData()
    } catch (err) {
      alert('Error saving candidate: ' + (err.message || err))
    }
  })
}

/* ---------------- Title Map logic (Option A: ids stored in Title_Map.ids as comma-string) ---------------- */

if (titleMapBtn) titleMapBtn.addEventListener('click', async () => {
  if (titleMapPopup) titleMapPopup.classList.remove('hidden')
  await loadTitles()
})
if (closeTitleMap) closeTitleMap.addEventListener('click', () => {
  if (titleMapPopup) titleMapPopup.classList.add('hidden')
})

// Open add modal
if (openAddBtnTM) openAddBtnTM.addEventListener('click', () => {
  editingId = null
  if (modeSelect) modeSelect.value = 'title'
  onModeChange()
  if (newTitleInput) newTitleInput.value = ''
  if (newItemInput) newItemInput.value = ''
  fillTitleDropdown()
  if (modalBackTM) modalBackTM.classList.remove('hidden')
})
if (cancelBtnTM) cancelBtnTM.addEventListener('click', () => { if (modalBackTM) modalBackTM.classList.add('hidden') })

// Mode handling: show/hide fields
function onModeChange() {
  const mode = modeSelect ? modeSelect.value : 'title'
  const titleFields = document.getElementById('titleFields')
  const itemFields = document.getElementById('itemFields')
  const itemNameRow = document.getElementById('itemNameRow')
  if (mode === 'title') {
    if (titleFields) titleFields.style.display = 'block'
    if (itemFields) itemFields.style.display = 'none'
    if (itemNameRow) itemNameRow.style.display = 'none'
    destroySuggestions()
  } else {
    if (titleFields) titleFields.style.display = 'none'
    if (itemFields) itemFields.style.display = 'block'
    if (itemNameRow) itemNameRow.style.display = 'flex'
    ensureSuggestionHandlers()
  }
}
if (modeSelect) modeSelect.addEventListener('change', onModeChange)

// Load all titles from Supabase
async function loadTitles() {
  if (!listEl) return
  listEl.innerHTML = '<div class="muted">Loading titles...</div>'
  try {
    const { data, error } = await supabase.from('Title_Map').select('*').order('titleid')
    if (error) {
      listEl.innerHTML = `<div class="muted">Error loading titles: ${error.message}</div>`
      console.error('loadTitles error', error)
      return
    }
    titles = (data || []).map(t => ({ titleid: t.titleid, title: t.title || '', ids: t.ids || '' }))
    renderTitles()
    fillTitleDropdown()
  } catch (err) {
    console.error('loadTitles error', err)
    listEl.innerHTML = `<div class="muted">Error loading titles</div>`
  }
}

function renderTitles(filter = '') {
  if (!listEl) return
  listEl.innerHTML = ''
  const filtered = titles.filter(t => (t.title || '').toLowerCase().includes(filter.toLowerCase()))
  if (!filtered.length) {
    listEl.innerHTML = '<div class="muted">No titles yet</div>'
    return
  }
  filtered.forEach(t => {
    const el = document.createElement('div')
    el.className = 'tile'
    el.innerHTML = `
      <div class="title-left">
        <div class="title-name">${encodeHTML(t.title)}</div>
        <div class="itemsRow">IDs: ${encodeHTML(t.ids || '(none)')}</div>
      </div>
      <div class="tileHeader">
        <div>
          <div class="meta">ID: ${t.titleid}</div>
        </div>
        <div class="title-actions">
          <button class="btn secondary edit-title-btn" data-id="${t.titleid}">Edit</button>
          <button class="btn danger delete-title-btn" data-id="${t.titleid}">Delete</button>
        </div>
      </div>
    `
    listEl.appendChild(el)
  })
}

// Fill dropdown for Add Item mode
function fillTitleDropdown() {
  if (!selectTitleForItem) return
  selectTitleForItem.innerHTML = ''
  const opt = document.createElement('option')
  opt.value = ''
  opt.textContent = '-- Select title --'
  selectTitleForItem.appendChild(opt)
  titles.forEach(t => {
    const o = document.createElement('option')
    o.value = t.titleid
    o.textContent = t.title
    selectTitleForItem.appendChild(o)
  })
}

/* Submit modal - add title OR add item */
if (submitModalBtn) submitModalBtn.addEventListener('click', async () => {
  const mode = modeSelect ? modeSelect.value : 'title'
  try {
    if (mode === 'title') {
      const name = (newTitleInput ? newTitleInput.value : '').trim()
      if (!name) return alert('Enter title name')
      const { data, error } = await supabase.from('Title_Map').insert([{ title: name, ids: '' }]).select().single()
      if (error) return alert('Add title failed: ' + error.message)
      const newId = data && data.titleid
      if (newId) {
        await sendTitleMapToSheetByTitleId(newId, 'insert')
      }
    } else {
      // add item to existing title (append numeric ID)
      const titleId = Number(selectTitleForItem ? selectTitleForItem.value : 0)
      const raw = (newItemInput ? newItemInput.value : '').trim()
      if (!titleId || !raw) return alert('Select title and enter ID or select suggestion')

      // prefer selectedCandidateId if user selected suggestion
      let idToSave = selectedCandidateId || null
      if (!idToSave) {
        const match = raw.match(/\b(\d+)\b/)
        if (match) idToSave = match[1]
      }
      if (!idToSave) return alert('Could not determine numeric ID. Type or select a numeric ID.')

      // fetch current row and append
      const { data: tdata, error: terr } = await supabase.from('Title_Map').select('ids').eq('titleid', titleId).single()
      if (terr) return alert('Unable to fetch title row: ' + terr.message)
      const existing = tdata.ids ? tdata.ids.split(',').map(s => s.trim()).filter(s => s) : []
      if (!existing.includes(String(idToSave))) existing.push(String(idToSave))
      const newIds = existing.join(',')
      const { error } = await supabase.from('Title_Map').update({ ids: newIds }).eq('titleid', titleId)
      if (error) return alert('Add item failed: ' + error.message)
      await sendTitleMapToSheetByTitleId(titleId, 'update')
    }
    if (modalBackTM) modalBackTM.classList.add('hidden')
    selectedCandidateId = null
    destroySuggestions()
    await loadTitles()
  } catch (err) {
    console.error(err)
    alert('Something went wrong: ' + (err.message || err))
  }
})

/* LIST clicks: edit / delete (uses titleid) */
if (listEl) listEl.addEventListener('click', async (e) => {
  const editBtn = e.target.closest('.edit-title-btn')
  const delBtn = e.target.closest('.delete-title-btn')
  if (editBtn) {
    const id = Number(editBtn.dataset.id)
    const t = titles.find(x => x.titleid === id)
    if (!t) return
    currentEdit = { type: 'title', id }
    editFields.innerHTML = `
      <div class="row"><label>Title</label><input id="editTitleInput" value="${encodeHTML(t.title)}" class="input" /></div>
      <div class="row"><label>IDs (comma separated)</label><input id="editIdsInput" value="${encodeHTML(t.ids || '')}" class="input" /></div>
    `
    if (editBackTM) editBackTM.classList.remove('hidden')
    return
  }
  if (delBtn) {
    const id = Number(delBtn.dataset.id)
    if (!confirm('Delete this title and its IDs?')) return
    try {
      const { error } = await supabase.from('Title_Map').delete().eq('titleid', id)
      if (error) throw error
      // send delete to sheet (raw JSON)
      await fetch(EDGE_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'Title_Map', action: 'delete', record: { id } })
      })
      await loadTitles()
    } catch (err) {
      alert('Delete failed: ' + (err.message || err))
    }
    return
  }
})

/* Edit modal save/cancel */
if (editCancel) editCancel.addEventListener('click', () => {
  if (editBackTM) editBackTM.classList.add('hidden')
  currentEdit = null
})
if (editSave) editSave.addEventListener('click', async () => {
  if (!currentEdit) return
  const titleVal = document.getElementById('editTitleInput').value.trim()
  const idsVal = document.getElementById('editIdsInput').value.trim()
  try {
    const { error } = await supabase.from('Title_Map').update({ title: titleVal, ids: idsVal }).eq('titleid', currentEdit.id)
    if (error) return alert('Update failed: ' + error.message)
    await sendTitleMapToSheetByTitleId(currentEdit.id, 'update')
    if (editBackTM) editBackTM.classList.add('hidden')
    currentEdit = null
    await loadTitles()
  } catch (err) {
    alert('Failed updating: ' + (err.message || err))
  }
})

/* ---------------- Suggestion box for newItemInput ---------------- */
function ensureSuggestionHandlers() {
  if (!newItemInput) return
  newItemInput.addEventListener('input', onNewItemInput)
  newItemInput.addEventListener('focus', onNewItemInput)
  newItemInput.addEventListener('blur', () => {
    setTimeout(() => { if (suggestionContainer) suggestionContainer.innerHTML = '' }, 150)
  })
}
function destroySuggestions() {
  if (!newItemInput) return
  newItemInput.removeEventListener('input', onNewItemInput)
  newItemInput.removeEventListener('focus', onNewItemInput)
  if (suggestionContainer) suggestionContainer.innerHTML = ''
  selectedCandidateId = null
}
async function onNewItemInput() {
  const q = (newItemInput.value || '').trim()
  selectedCandidateId = null
  if (!q) {
    if (suggestionContainer) suggestionContainer.innerHTML = ''
    return
  }
  if (suggestionTimer) clearTimeout(suggestionTimer)
  suggestionTimer = setTimeout(() => showSuggestions(q), 250)
}
async function showSuggestions(q) {
  if (!suggestionContainer) return
  suggestionContainer.innerHTML = '<div class="muted">Searching...</div>'
  try {
    let results = []
    if (/^\d+$/.test(q)) {
      const { data: exact } = await supabase.from('Email_Atm').select('Unique,"Candidate Name"').eq('Unique', Number(q)).limit(5)
      results = exact || []
    }
    const { data: byName } = await supabase.from('Email_Atm').select('Unique,"Candidate Name"').ilike('Candidate Name', `%${q}%`).limit(10)
    const map = new Map()
    ;(results || []).forEach(r => map.set(String(r.Unique), r))
    ;(byName || []).forEach(r => { if (!map.has(String(r.Unique))) map.set(String(r.Unique), r) })
    const merged = Array.from(map.values()).slice(0, 10)
    if (!merged.length) {
      suggestionContainer.innerHTML = '<div class="muted">No candidates found</div>'
      return
    }
    suggestionContainer.innerHTML = merged.map(c => `
      <div class="suggestion-item" data-id="${c.Unique}" style="padding:6px;cursor:pointer;border-radius:6px;">
        <strong>${encodeHTML(c['Candidate Name'] || '(no name)')}</strong>
        <div style="font-size:12px;color:#666">ID: ${c.Unique}</div>
      </div>
    `).join('')
    suggestionContainer.querySelectorAll('.suggestion-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id
        const name = el.querySelector('strong').textContent
        newItemInput.value = `${name} — ${id}`
        selectedCandidateId = id
        suggestionContainer.innerHTML = ''
      })
    })
  } catch (err) {
    suggestionContainer.innerHTML = `<div class="muted">Error: ${err.message}</div>`
  }
}

/* ---------------- Sheet sync: send Title_Map row to Google Sheet webhook ---------------- */
/**
 * payload.record:
 *   id: titleid
 *   ids: array of id strings
 *   title: title string
 */
async function sendTitleMapToSheetByTitleId(titleId, action = 'update') {
  try {
    let row = null
    if (action !== 'delete') {
      const { data, error } = await supabase.from('Title_Map').select('*').eq('titleid', titleId).single()
      if (error) return console.error('sendTitleMap fetch failed', error)
      row = data
    }
    const idsArray = row && row.ids ? row.ids.split(',').map(s => s.trim()).filter(Boolean) : []
    const payload = {
      table: 'Title_Map',
      action,
      record: {
        id: titleId,
        ids: idsArray,
        title: row ? (row.title || '') : ''
      }
    }
    // send raw JSON (Apps Script uses e.postData.contents)
    await fetch(EDGE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (err) {
    console.error('sendTitleMapToSheet error', err)
  }
}

/* ---------------- Init ---------------- */
testConnection()
loadData()

// note: we intentionally DO NOT create realtime subscriptions here to avoid duplicate webhook calls.
// All syncs to the sheet are triggered manually after frontend changes (insert/update/delete).
