// Philippine Disaster Management & Infrastructure System
// Main JavaScript File

// Global Variables
let map;
let currentView = '2D';
let satelliteLayer;
let standardLayer;
let hazardLayers = [];
let weatherLayer;
let markers = [];
let isHazardLayerVisible = false;
let isWeatherVisible = false;

// Philippine Center Coordinates
const PHILIPPINES_CENTER = [12.8797, 121.7740];
const DEFAULT_ZOOM = 6;

// Sample Philippine Locations with Comprehensive Data
const philippineLocations = [
    {
        name: "Camarines Norte",
        coords: [14.1425, 122.7594],
        province: "Camarines Norte",
        region: "Bicol Region",
        population: 583313,
        hazards: {
            flooding: "critical",
            earthquake: "high",
            typhoon: "critical",
            landslide: "medium",
            tsunami: "low"
        },
        infrastructure: {
            drainage: "poor",
            roads: "fair",
            bridges: 45,
            powerGrid: "adequate"
        },
        problems: [
            "Severely inadequate drainage systems causing regular flooding",
            "Aging infrastructure unable to handle heavy rainfall",
            "Limited flood control measures",
            "Vulnerable coastal communities"
        ],
        solutions: [
            {
                type: "Drainage System Upgrade",
                budget: "₱450 Million",
                timeline: "18-24 months",
                priority: "critical",
                description: "Complete overhaul of drainage infrastructure with modern pumping stations"
            },
            {
                type: "Flood Barriers & Retention Ponds",
                budget: "₱280 Million",
                timeline: "12-18 months",
                priority: "high",
                description: "Strategic placement of flood barriers and construction of retention basins"
            }
        ],
        opportunityScore: 95,
        evacuationRoutes: ["Route 1: Via Maharlika Highway North", "Route 2: Via Coastal Road to higher ground"],
        recentNews: [
            "Flooding incidents increased by 40% in the past year due to inadequate drainage",
            "Local government approved emergency infrastructure fund",
            "Community reports frequent waterlogging during monsoon season"
        ]
    },
    {
        name: "Metro Manila",
        coords: [14.5995, 120.9842],
        province: "National Capital Region",
        region: "NCR",
        population: 13484462,
        hazards: {
            flooding: "critical",
            earthquake: "critical",
            typhoon: "high",
            landslide: "low",
            tsunami: "medium"
        },
        infrastructure: {
            drainage: "fair",
            roads: "good",
            bridges: 234,
            powerGrid: "excellent"
        },
        problems: [
            "Urban flooding during heavy rainfall",
            "Earthquake vulnerability due to West Valley Fault",
            "Traffic congestion affecting emergency response",
            "Dense population complicates evacuation"
        ],
        solutions: [
            {
                type: "Smart Flood Management System",
                budget: "₱2.1 Billion",
                timeline: "24-36 months",
                priority: "critical",
                description: "AI-powered flood prediction and automated pumping stations"
            },
            {
                type: "Earthquake Early Warning Network",
                budget: "₱890 Million",
                timeline: "12 months",
                priority: "critical",
                description: "Seismic sensors and public alert system"
            }
        ],
        opportunityScore: 88,
        evacuationRoutes: ["Multiple routes via EDSA, C5, and Skyway systems"],
        recentNews: [
            "New flood control projects approved by MMDA",
            "West Valley Fault showing increased activity",
            "Smart city initiatives include disaster preparedness"
        ]
    },
    {
        name: "Tacloban City",
        coords: [11.2500, 125.0000],
        province: "Leyte",
        region: "Eastern Visayas",
        population: 251881,
        hazards: {
            flooding: "high",
            earthquake: "medium",
            typhoon: "critical",
            landslide: "low",
            tsunami: "critical"
        },
        infrastructure: {
            drainage: "improved",
            roads: "good",
            bridges: 28,
            powerGrid: "good"
        },
        problems: [
            "Extreme vulnerability to super typhoons (Yolanda experience)",
            "Storm surge risk in coastal areas",
            "Need for reinforced evacuation centers",
            "Limited early warning time for tsunamis"
        ],
        solutions: [
            {
                type: "Elevated Evacuation Centers",
                budget: "₱650 Million",
                timeline: "18 months",
                priority: "critical",
                description: "Multi-story evacuation facilities above storm surge levels"
            },
            {
                type: "Coastal Defense System",
                budget: "₱1.2 Billion",
                timeline: "24-30 months",
                priority: "high",
                description: "Seawalls and mangrove rehabilitation"
            }
        ],
        opportunityScore: 92,
        evacuationRoutes: ["Route 1: Via San Juanico Bridge to Samar", "Route 2: Inland routes to higher elevation"],
        recentNews: [
            "City continues recovery and resilience building post-Yolanda",
            "New tsunami warning buoys installed offshore",
            "Improved early warning systems operational"
        ]
    },
    {
        name: "Baguio City",
        coords: [16.4023, 120.5960],
        province: "Benguet",
        region: "Cordillera Administrative Region",
        population: 366358,
        hazards: {
            flooding: "medium",
            earthquake: "high",
            typhoon: "medium",
            landslide: "critical",
            tsunami: "none"
        },
        infrastructure: {
            drainage: "good",
            roads: "fair",
            bridges: 15,
            powerGrid: "good"
        },
        problems: [
            "Severe landslide risk in mountainous terrain",
            "Soil erosion from deforestation",
            "Road networks vulnerable to landslides",
            "Aging retaining walls"
        ],
        solutions: [
            {
                type: "Slope Stabilization Program",
                budget: "₱580 Million",
                timeline: "24 months",
                priority: "critical",
                description: "Geo-engineering solutions and reinforced retaining structures"
            },
            {
                type: "Reforestation & Drainage",
                budget: "₱320 Million",
                timeline: "36 months",
                priority: "high",
                description: "Strategic tree planting and improved mountain drainage"
            }
        ],
        opportunityScore: 87,
        evacuationRoutes: ["Route 1: Via Marcos Highway", "Route 2: Via Kennon Road (weather permitting)"],
        recentNews: [
            "Recent landslides blocked major access roads",
            "Climate change causing more intense rainfall",
            "City government prioritizing slope protection projects"
        ]
    },
    {
        name: "Davao City",
        coords: [7.1907, 125.4553],
        province: "Davao del Sur",
        region: "Davao Region",
        population: 1776949,
        hazards: {
            flooding: "medium",
            earthquake: "high",
            typhoon: "low",
            landslide: "medium",
            tsunami: "medium"
        },
        infrastructure: {
            drainage: "good",
            roads: "excellent",
            bridges: 67,
            powerGrid: "excellent"
        },
        problems: [
            "Earthquake risk from Philippine Fault Zone",
            "Flood-prone areas during heavy rainfall",
            "Rapid urbanization stressing infrastructure",
            "Coastal area tsunami vulnerability"
        ],
        solutions: [
            {
                type: "Seismic Retrofitting Program",
                budget: "₱1.4 Billion",
                timeline: "30 months",
                priority: "high",
                description: "Strengthen critical infrastructure against earthquakes"
            },
            {
                type: "Integrated Flood Management",
                budget: "₱670 Million",
                timeline: "18 months",
                priority: "medium",
                description: "Expand drainage capacity and flood barriers"
            }
        ],
        opportunityScore: 78,
        evacuationRoutes: ["Multiple routes via circumferential roads"],
        recentNews: [
            "City expanding disaster preparedness training",
            "New building codes require earthquake resistance",
            "Investment in smart city infrastructure"
        ]
    },
    {
        name: "Cebu City",
        coords: [10.3157, 123.8854],
        province: "Cebu",
        region: "Central Visayas",
        population: 964169,
        hazards: {
            flooding: "high",
            earthquake: "critical",
            typhoon: "high",
            landslide: "medium",
            tsunami: "medium"
        },
        infrastructure: {
            drainage: "fair",
            roads: "good",
            bridges: 89,
            powerGrid: "excellent"
        },
        problems: [
            "Major fault lines running through metro area",
            "Flash flooding in low-lying communities",
            "Inadequate drainage in older districts",
            "High-density construction in hazard zones"
        ],
        solutions: [
            {
                type: "Comprehensive Earthquake Preparedness",
                budget: "₱1.8 Billion",
                timeline: "36 months",
                priority: "critical",
                description: "Citywide seismic upgrade and early warning system"
            },
            {
                type: "Flood Control Modernization",
                budget: "₱920 Million",
                timeline: "24 months",
                priority: "high",
                description: "Upgrade pumping stations and expand drainage network"
            }
        ],
        opportunityScore: 85,
        evacuationRoutes: ["Route 1: Via South Road Properties", "Route 2: Via Transcentral Highway"],
        recentNews: [
            "Recent earthquake drills highlight infrastructure gaps",
            "City experiences seasonal flooding",
            "Metro Cebu earthquake preparedness initiative launched"
        ]
    }
];

// Initialize Map
function initMap() {
    // Create map centered on Philippines
    map = L.map('map', {
        zoomControl: false
    }).setView(PHILIPPINES_CENTER, DEFAULT_ZOOM);

    // Add zoom control to bottom right
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Standard OpenStreetMap layer
    standardLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Satellite layer (initially hidden)
    satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19
    });

    // Add location markers
    addLocationMarkers();

    // Add click event for map
    map.on('click', handleMapClick);
}

// Add Location Markers
function addLocationMarkers() {
    philippineLocations.forEach(location => {
        const hazardLevel = getHighestHazardLevel(location.hazards);
        const markerColor = getHazardColor(hazardLevel);
        
        const marker = L.circleMarker(location.coords, {
            radius: 10,
            fillColor: markerColor,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
            className: 'hazard-marker'
        }).addTo(map);

        marker.locationData = location;
        
        marker.on('click', function() {
            showLocationDetails(location);
            highlightMarker(this);
        });

        const popupContent = `
            <strong>${location.name}</strong><br>
            Population: ${location.population.toLocaleString()}<br>
            Highest Risk: <span class="risk-badge ${hazardLevel}">${hazardLevel}</span><br>
            <small>Click for detailed information</small>
        `;
        
        marker.bindPopup(popupContent);
        markers.push(marker);
    });
}

// Get Highest Hazard Level
function getHighestHazardLevel(hazards) {
    const levels = Object.values(hazards);
    if (levels.includes('critical')) return 'critical';
    if (levels.includes('high')) return 'high';
    if (levels.includes('medium')) return 'medium';
    return 'low';
}

// Get Hazard Color
function getHazardColor(level) {
    const colors = {
        'critical': '#ff4444',
        'high': '#ff9800',
        'medium': '#ffeb3b',
        'low': '#4caf50',
        'none': '#2196f3'
    };
    return colors[level] || colors['low'];
}

// Highlight Selected Marker
function highlightMarker(marker) {
    markers.forEach(m => {
        m.setStyle({ weight: 2, radius: 10 });
    });
    marker.setStyle({ weight: 4, radius: 14 });
}

// Show Location Details in Side Panel
function showLocationDetails(location) {
    const panel = document.getElementById('sidePanel');
    const title = document.getElementById('panelTitle');
    const content = document.getElementById('panelContent');

    title.textContent = location.name;
    
    let hazardsHtml = '';
    for (const [hazard, level] of Object.entries(location.hazards)) {
        if (level !== 'none') {
            hazardsHtml += `
                <div class="info-item">
                    <span class="info-label">${capitalizeFirst(hazard)}:</span>
                    <span class="risk-badge ${level}">${level}</span>
                </div>
            `;
        }
    }

    let problemsHtml = location.problems.map(p => `<li>${p}</li>`).join('');
    
    let solutionsHtml = location.solutions.map(s => `
        <div class="info-section">
            <h3>${s.type}</h3>
            <div class="info-item">
                <span class="info-label">Budget:</span>
                <span class="info-value">${s.budget}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Timeline:</span>
                <span class="info-value">${s.timeline}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Priority:</span>
                <span class="risk-badge ${s.priority}">${s.priority}</span>
            </div>
            <p style="margin-top: 10px; color: #b0b0b0; font-size: 13px;">${s.description}</p>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="info-section">
            <h3>Basic Information</h3>
            <div class="info-item">
                <span class="info-label">Province:</span>
                <span class="info-value">${location.province}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Region:</span>
                <span class="info-value">${location.region}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Population:</span>
                <span class="info-value">${location.population.toLocaleString()}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Opportunity Score:</span>
                <span class="info-value">${location.opportunityScore}/100</span>
            </div>
        </div>

        <div class="info-section">
            <h3>Hazard Assessment</h3>
            ${hazardsHtml}
        </div>

        <div class="info-section">
            <h3>Infrastructure Status</h3>
            <div class="info-item">
                <span class="info-label">Drainage System:</span>
                <span class="info-value">${capitalizeFirst(location.infrastructure.drainage)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Road Network:</span>
                <span class="info-value">${capitalizeFirst(location.infrastructure.roads)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Bridges:</span>
                <span class="info-value">${location.infrastructure.bridges}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Power Grid:</span>
                <span class="info-value">${capitalizeFirst(location.infrastructure.powerGrid)}</span>
            </div>
        </div>

        <div class="info-section">
            <h3>Current Problems</h3>
            <ul style="margin: 10px 0; padding-left: 20px; color: #e0e0e0; line-height: 1.6;">
                ${problemsHtml}
            </ul>
        </div>

        <div class="info-section">
            <h3>Recommended Solutions</h3>
            ${solutionsHtml}
        </div>

        <div class="info-section">
            <h3>Evacuation Routes</h3>
            <ul style="margin: 10px 0; padding-left: 20px; color: #e0e0e0; line-height: 1.6;">
                ${location.evacuationRoutes.map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>

        <button class="action-btn" onclick="generateAIAnalysis('${location.name}')">
            Generate AI Infrastructure Plan
        </button>
        <button class="action-btn secondary" onclick="viewIn3D('${location.name}')">
            View in 3D Mode
        </button>
    `;

    panel.classList.remove('hidden');
    
    // Show high-risk alert if critical
    if (getHighestHazardLevel(location.hazards) === 'critical') {
        showAlert(
            'Critical Risk Zone',
            `${location.name} has critical hazard levels. Immediate infrastructure improvements recommended.`,
            'critical'
        );
    }
}

// Handle Map Click
function handleMapClick(e) {
    const lat = e.latlng.lat.toFixed(4);
    const lng = e.latlng.lng.toFixed(4);
    
    // Show placeholder info for arbitrary location
    const panel = document.getElementById('sidePanel');
    const title = document.getElementById('panelTitle');
    const content = document.getElementById('panelContent');

    title.textContent = `Location: ${lat}, ${lng}`;
    content.innerHTML = `
        <div class="info-section">
            <h3>Coordinates</h3>
            <div class="info-item">
                <span class="info-label">Latitude:</span>
                <span class="info-value">${lat}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Longitude:</span>
                <span class="info-value">${lng}</span>
            </div>
        </div>
        <p style="color: #8b92b0; margin-top: 20px;">
            Click on marked locations for detailed hazard and infrastructure data.
        </p>
        <button class="action-btn" onclick="askAIAboutLocation(${lat}, ${lng})">
            Ask AI About This Location
        </button>
    `;
    
    panel.classList.remove('hidden');
}

// AI Query Handler
async function handleAIQuery() {
    const query = document.getElementById('aiQuery').value.trim();
    if (!query) return;

    const modal = document.getElementById('aiModal');
    const responseDiv = document.getElementById('aiResponse');
    
    modal.classList.add('active');
    responseDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>AI is analyzing your query...</p>
        </div>
    `;

    try {
        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate AI response based on query
        const response = await generateAIResponse(query);
        
        responseDiv.innerHTML = `<div class="ai-content">${response}</div>`;
    } catch (error) {
        responseDiv.innerHTML = `
            <div class="ai-content">
                <p style="color: #ff4444;">Error processing your query. Please try again.</p>
            </div>
        `;
    }
}

// Generate AI Response
async function generateAIResponse(query) {
    const queryLower = query.toLowerCase();
    
    // Check if query is about a specific location
    let relevantLocation = null;
    for (const loc of philippineLocations) {
        if (queryLower.includes(loc.name.toLowerCase()) || 
            queryLower.includes(loc.province.toLowerCase())) {
            relevantLocation = loc;
            break;
        }
    }

    // Population queries
    if (queryLower.includes('population') || queryLower.includes('people')) {
        if (relevantLocation) {
            return `
                <h3>Population Data for ${relevantLocation.name}</h3>
                <p><strong>Current Population:</strong> ${relevantLocation.population.toLocaleString()}</p>
                <p>Located in ${relevantLocation.province}, ${relevantLocation.region}.</p>
                <p>This represents a significant population concentration requiring robust disaster preparedness measures.</p>
            `;
        } else {
            return `
                <h3>Philippine Population Overview</h3>
                <p>The Philippines has a population of approximately 115 million people. Here are some key cities:</p>
                <ul>
                    ${philippineLocations.map(loc => 
                        `<li><strong>${loc.name}:</strong> ${loc.population.toLocaleString()}</li>`
                    ).join('')}
                </ul>
            `;
        }
    }

    // Hazard queries
    if (queryLower.includes('hazard') || queryLower.includes('risk') || queryLower.includes('danger') ||
        queryLower.includes('flood') || queryLower.includes('earthquake') || queryLower.includes('typhoon')) {
        if (relevantLocation) {
            let hazardList = '';
            for (const [hazard, level] of Object.entries(relevantLocation.hazards)) {
                if (level !== 'none') {
                    hazardList += `<li><strong>${capitalizeFirst(hazard)}:</strong> <span class="risk-badge ${level}">${level.toUpperCase()}</span></li>`;
                }
            }
            
            return `
                <h3>Hazard Assessment for ${relevantLocation.name}</h3>
                <p>Based on geological surveys, weather patterns, and historical data:</p>
                <ul>${hazardList}</ul>
                <h3>Recent News & Context</h3>
                <ul>
                    ${relevantLocation.recentNews.map(news => `<li>${news}</li>`).join('')}
                </ul>
                <h3>Current Problems</h3>
                <ul>
                    ${relevantLocation.problems.map(prob => `<li>${prob}</li>`).join('')}
                </ul>
            `;
        } else {
            return `
                <h3>Hazard Overview - Philippines</h3>
                <p>The Philippines faces multiple natural hazards due to its geographical location:</p>
                <ul>
                    <li><strong>Typhoons:</strong> Average of 20 typhoons per year</li>
                    <li><strong>Earthquakes:</strong> Located on Pacific Ring of Fire</li>
                    <li><strong>Flooding:</strong> Monsoon rains and poor drainage in many areas</li>
                    <li><strong>Landslides:</strong> Mountainous terrain and deforestation</li>
                    <li><strong>Volcanic Activity:</strong> 24 active volcanoes</li>
                </ul>
                <p>Click on specific locations on the map to see detailed hazard assessments.</p>
            `;
        }
    }

    // Infrastructure queries
    if (queryLower.includes('infrastructure') || queryLower.includes('drainage') || 
        queryLower.includes('road') || queryLower.includes('bridge')) {
        if (relevantLocation) {
            return `
                <h3>Infrastructure Status - ${relevantLocation.name}</h3>
                <p><strong>Drainage System:</strong> ${capitalizeFirst(relevantLocation.infrastructure.drainage)}</p>
                <p><strong>Road Network:</strong> ${capitalizeFirst(relevantLocation.infrastructure.roads)}</p>
                <p><strong>Number of Bridges:</strong> ${relevantLocation.infrastructure.bridges}</p>
                <p><strong>Power Grid:</strong> ${capitalizeFirst(relevantLocation.infrastructure.powerGrid)}</p>
                
                <h3>Infrastructure Problems</h3>
                <ul>
                    ${relevantLocation.problems.map(prob => `<li>${prob}</li>`).join('')}
                </ul>
                
                <h3>News & Updates</h3>
                <ul>
                    ${relevantLocation.recentNews.map(news => `<li>${news}</li>`).join('')}
                </ul>
            `;
        }
    }

    // Solution queries
    if (queryLower.includes('solution') || queryLower.includes('fix') || 
        queryLower.includes('improve') || queryLower.includes('budget')) {
        if (relevantLocation) {
            let solutionsHtml = relevantLocation.solutions.map(sol => `
                <div class="info-section">
                    <h3>${sol.type}</h3>
                    <p><strong>Budget Required:</strong> ${sol.budget}</p>
                    <p><strong>Timeline:</strong> ${sol.timeline}</p>
                    <p><strong>Priority Level:</strong> <span class="risk-badge ${sol.priority}">${sol.priority.toUpperCase()}</span></p>
                    <p>${sol.description}</p>
                </div>
            `).join('');
            
            return `
                <h3>Recommended Solutions for ${relevantLocation.name}</h3>
                <p><strong>Opportunity Score:</strong> ${relevantLocation.opportunityScore}/100</p>
                <p>This score indicates high community need and project feasibility.</p>
                ${solutionsHtml}
                <h3>Why These Locations Were Chosen</h3>
                <p>Solutions are strategically placed in areas with:</p>
                <ul>
                    <li>Maximum community impact</li>
                    <li>Feasible implementation (avoiding high-risk zones)</li>
                    <li>Accessibility for construction</li>
                    <li>Long-term sustainability</li>
                </ul>
            `;
        }
    }

    // Evacuation queries
    if (queryLower.includes('evacuation') || queryLower.includes('escape') || queryLower.includes('safety route')) {
        if (relevantLocation) {
            return `
                <h3>Evacuation Information - ${relevantLocation.name}</h3>
                <p><strong>Available Evacuation Routes:</strong></p>
                <ul>
                    ${relevantLocation.evacuationRoutes.map(route => `<li>${route}</li>`).join('')}
                </ul>
                <p><strong>Safety Recommendations:</strong></p>
                <ul>
                    <li>Keep emergency supplies ready (water, food, first aid)</li>
                    <li>Have a family communication plan</li>
                    <li>Know the nearest evacuation centers</li>
                    <li>Monitor official alerts and warnings</li>
                    <li>Evacuate early when advised by authorities</li>
                </ul>
            `;
        }
    }

    // Default response with AI capabilities explanation
    return `
        <h3>AI Analysis System</h3>
        <p>I can help you with:</p>
        <ul>
            <li><strong>Population Data:</strong> Ask about population in any location</li>
            <li><strong>Hazard Assessment:</strong> Query about floods, earthquakes, typhoons, landslides</li>
            <li><strong>Infrastructure Status:</strong> Check drainage, roads, bridges, power grid</li>
            <li><strong>Solutions & Budget:</strong> Get AI-recommended improvements with costs</li>
            <li><strong>Evacuation Routes:</strong> Find safe evacuation paths</li>
            <li><strong>News & Updates:</strong> Latest information about any location</li>
        </ul>
        <p><strong>Example queries:</strong></p>
        <ul>
            <li>"How many people are in Camarines Norte?"</li>
            <li>"What are the flood risks in Metro Manila?"</li>
            <li>"Show me solutions for Tacloban City"</li>
            <li>"What is the drainage status in Baguio?"</li>
        </ul>
        <p>Try asking a specific question about any Philippine location!</p>
    `;
}

// Generate AI Analysis for Location
async function generateAIAnalysis(locationName) {
    const location = philippineLocations.find(loc => loc.name === locationName);
    if (!location) return;

    const modal = document.getElementById('aiModal');
    const responseDiv = document.getElementById('aiResponse');
    
    modal.classList.add('active');
    responseDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>AI is generating comprehensive infrastructure plan...</p>
        </div>
    `;

    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const highestHazard = getHighestHazardLevel(location.hazards);
    const totalBudget = location.solutions.reduce((sum, sol) => {
        const amount = parseInt(sol.budget.replace(/[₱,Million ]/g, ''));
        return sum + amount;
    }, 0);

    responseDiv.innerHTML = `
        <div class="ai-content">
            <h3>AI-Generated Infrastructure Plan: ${location.name}</h3>
            
            <div class="info-section">
                <h3>Executive Summary</h3>
                <p>Based on comprehensive analysis of hazard data, population density, infrastructure status, and recent events, the following plan is recommended for ${location.name}.</p>
                <p><strong>Overall Risk Level:</strong> <span class="risk-badge ${highestHazard}">${highestHazard.toUpperCase()}</span></p>
                <p><strong>Total Estimated Budget:</strong> ₱${totalBudget} Million</p>
                <p><strong>Implementation Priority:</strong> Immediate action required</p>
            </div>

            <div class="info-section">
                <h3>Phase 1: Critical Interventions</h3>
                ${location.solutions.filter(s => s.priority === 'critical').map(sol => `
                    <p><strong>${sol.type}</strong></p>
                    <p>Budget: ${sol.budget} | Timeline: ${sol.timeline}</p>
                    <p>${sol.description}</p>
                `).join('<br>')}
            </div>

            <div class="info-section">
                <h3>Phase 2: High Priority Projects</h3>
                ${location.solutions.filter(s => s.priority === 'high').map(sol => `
                    <p><strong>${sol.type}</strong></p>
                    <p>Budget: ${sol.budget} | Timeline: ${sol.timeline}</p>
                    <p>${sol.description}</p>
                `).join('<br>')}
            </div>

            <div class="info-section">
                <h3>Strategic Placement Analysis</h3>
                <p>All recommended projects are positioned in areas that:</p>
                <ul>
                    <li>Minimize construction risk (avoiding landslide/flood zones)</li>
                    <li>Maximize community protection</li>
                    <li>Ensure accessibility for maintenance</li>
                    <li>Provide scalable solutions</li>
                </ul>
            </div>

            <div class="info-section">
                <h3>3D Visualization & Mockups</h3>
                <p>3D architectural renderings show proposed structures integrated with:</p>
                <ul>
                    <li>Local terrain and elevation data</li>
                    <li>Existing infrastructure network</li>
                    <li>Weather pattern considerations</li>
                    <li>Seismic safety requirements</li>
                </ul>
                <button class="action-btn" onclick="viewIn3D('${location.name}')">View 3D Models</button>
            </div>

            <div class="info-section">
                <h3>Community Impact</h3>
                <p><strong>Population Served:</strong> ${location.population.toLocaleString()} residents</p>
                <p><strong>Expected Outcomes:</strong></p>
                <ul>
                    <li>Reduction in flood-related damages by 70%</li>
                    <li>Improved emergency response times</li>
                    <li>Enhanced community resilience</li>
                    <li>Economic growth through infrastructure improvement</li>
                </ul>
            </div>

            <div class="info-section">
                <h3>Funding & ROI</h3>
                <p>Multiple funding scenarios available:</p>
                <ul>
                    <li>National government allocation</li>
                    <li>International disaster mitigation grants</li>
                    <li>Public-private partnerships</li>
                    <li>Climate adaptation funds</li>
                </ul>
                <p><strong>Projected ROI:</strong> Every peso invested saves ₱4-6 in disaster recovery costs</p>
            </div>
        </div>
    `;
}

// Ask AI About Arbitrary Location
function askAIAboutLocation(lat, lng) {
    document.getElementById('aiQuery').value = `What information is available for location ${lat}, ${lng}?`;
    handleAIQuery();
}

// View in 3D Mode
function viewIn3D(locationName) {
    showAlert(
        '3D Mode',
        `3D visualization for ${locationName} would be displayed here with detailed building models, terrain elevation, and proposed infrastructure improvements.`,
        'info'
    );
}

// Show Alert
function showAlert(title, message, type = 'info') {
    const container = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
    `;
    
    container.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Toggle Controls
function toggle2D3D() {
    currentView = currentView === '2D' ? '3D' : '2D';
    const btn = document.getElementById('toggle2D3D');
    btn.querySelector('span').textContent = currentView === '2D' ? '3D' : '2D';
    btn.classList.toggle('active');
    
    if (currentView === '3D') {
        showAlert('3D Mode', '3D building models and terrain visualization activated', 'info');
    }
}

function toggleSatellite() {
    const btn = document.getElementById('toggleSatellite');
    btn.classList.toggle('active');
    
    if (map.hasLayer(satelliteLayer)) {
        map.removeLayer(satelliteLayer);
        map.addLayer(standardLayer);
    } else {
        map.removeLayer(standardLayer);
        map.addLayer(satelliteLayer);
    }
}

function toggleHazards() {
    isHazardLayerVisible = !isHazardLayerVisible;
    const btn = document.getElementById('toggleHazards');
    btn.classList.toggle('active');
    
    if (isHazardLayerVisible) {
        // Add visual hazard overlays
        showAlert('Hazard Layers', 'Displaying all hazard risk zones', 'warning');
    } else {
        // Remove hazard overlays
    }
}

function toggleWeather() {
    isWeatherVisible = !isWeatherVisible;
    const btn = document.getElementById('toggleWeather');
    btn.classList.toggle('active');
    
    if (isWeatherVisible) {
        showAlert('Weather Data', 'Real-time weather conditions and forecasts activated', 'info');
    }
}

// Utility Functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    initMap();

    // Query button
    document.getElementById('queryBtn').addEventListener('click', handleAIQuery);
    document.getElementById('aiQuery').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleAIQuery();
    });

    // Close buttons
    document.getElementById('closePanel').addEventListener('click', function() {
        document.getElementById('sidePanel').classList.add('hidden');
    });

    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('aiModal').classList.remove('active');
    });

    // Map controls
    document.getElementById('toggle2D3D').addEventListener('click', toggle2D3D);
    document.getElementById('toggleSatellite').addEventListener('click', toggleSatellite);
    document.getElementById('toggleHazards').addEventListener('click', toggleHazards);
    document.getElementById('toggleWeather').addEventListener('click', toggleWeather);

    // Show welcome message
    setTimeout(() => {
        showAlert(
            'Welcome to Philippine Disaster Management System',
            'Click on any location to view detailed hazard information and AI-generated solutions. Use the search bar to ask questions.',
            'info'
        );
    }, 1000);
});

// Export for global access
window.generateAIAnalysis = generateAIAnalysis;
window.viewIn3D = viewIn3D;
window.askAIAboutLocation = askAIAboutLocation;
