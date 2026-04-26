const EXTERNAL_ONLY_MINUTES = 5;

export function filterRouteByDay(route, dayKey) {
  const enrichedPOIs = route.pois.map(poi => {
    const schedule = poi.schedule?.[dayKey];
    const isOpen = schedule != null;
    const externalOnly = !isOpen && poi.externalViewingAlways;
    const skip = !isOpen && !poi.externalViewingAlways;

    let adjustedVisitMinutes = poi.estimatedVisitMinutes;
    let statusLabel = 'Aberto';
    let statusType = 'open';

    if (externalOnly) {
      adjustedVisitMinutes = EXTERNAL_ONLY_MINUTES;
      statusLabel = 'Vista externa';
      statusType = 'external';
    } else if (skip) {
      adjustedVisitMinutes = 0;
      statusLabel = 'Fechado';
      statusType = 'closed';
    }

    return {
      ...poi,
      isOpen,
      externalOnly,
      skip,
      adjustedVisitMinutes,
      statusLabel,
      statusType,
      scheduleToday: schedule,
    };
  });

  const activePOIs = enrichedPOIs.filter(p => !p.skip);
  const skippedPOIs = enrichedPOIs.filter(p => p.skip);

  // Calculate total duration
  const visitTime = activePOIs.reduce((sum, p) => sum + p.adjustedVisitMinutes, 0);

  // Calculate walking time between active POIs
  let walkTime = 0;
  const activeSegments = [];
  for (let i = 0; i < activePOIs.length - 1; i++) {
    const seg = findSegment(route.segments, activePOIs[i].id, activePOIs[i + 1].id);
    if (seg) {
      walkTime += seg.walkingMinutes;
      activeSegments.push(seg);
    } else {
      // If no direct segment, estimate 3 min per 200m
      walkTime += 5;
      activeSegments.push({
        from: activePOIs[i].id,
        to: activePOIs[i + 1].id,
        walkingMinutes: 5,
        distanceMeters: 300,
        path: [[activePOIs[i].lat, activePOIs[i].lng], [activePOIs[i + 1].lat, activePOIs[i + 1].lng]],
        streetNotes: ''
      });
    }
  }

  const totalMinutes = visitTime + walkTime;
  const totalDistanceKm = activeSegments.reduce((sum, s) => sum + (s.distanceMeters || 0), 0) / 1000;

  return {
    pois: activePOIs,
    skippedPOIs,
    segments: activeSegments,
    totalMinutes,
    totalDistanceKm,
    visitTime,
    walkTime,
    isWithinLimit: totalMinutes <= 330,
    poiCount: activePOIs.length,
    openCount: activePOIs.filter(p => p.isOpen).length,
    externalCount: activePOIs.filter(p => p.externalOnly).length,
  };
}

function findSegment(segments, fromId, toId) {
  // Try direct match first
  let seg = segments.find(s => s.from === fromId && s.to === toId);
  if (seg) return seg;

  // Try to find a chain of segments between fromId and toId
  // For now, return null and let the caller estimate
  return null;
}

export function countOpenPOIs(route, dayKey) {
  return route.pois.filter(p => {
    const schedule = p.schedule?.[dayKey];
    return schedule != null || p.externalViewingAlways;
  }).length;
}

// ── Multi-day itinerary (Munique) ────────────────────────────────────────────
// Filtra POIs por `dayId` (vinculação explícita no JSON) em vez de dia da semana.

// Normaliza segmentos para campos canônicos (walkingMinutes + distanceMeters),
// independente do formato usado no JSON (munique, praga/nuremberg ou legado).
function normalizeSegment(seg) {
  const walkingMinutes =
    seg.walkingMinutes ?? seg.duration ?? seg.minutes ?? 0;
  const distanceMeters =
    seg.distanceMeters != null
      ? seg.distanceMeters
      : seg.distance != null
        ? Math.round(seg.distance * 1000)
        : 0;
  return { ...seg, walkingMinutes, distanceMeters };
}

export function filterRouteByDayIndex(route, dayIndex) {
  const day = route.days?.[dayIndex];
  if (!day) {
    return {
      pois: [],
      skippedPOIs: [],
      segments: [],
      day: null,
      totalMinutes: 0,
      totalDistanceKm: 0,
      visitTime: 0,
      walkTime: 0,
      isWithinLimit: true,
      poiCount: 0,
      openCount: 0,
      externalCount: 0,
    };
  }

  // POIs deste dia, ordenados pelo campo `order`, enriquecidos com campos de UI
  const dayPOIs = route.pois
    .filter(p => p.dayId === day.id)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(poi => ({
      ...poi,
      isOpen: true,
      externalOnly: poi.visitType === 'external',
      skip: false,
      adjustedVisitMinutes: poi.estimatedVisitMinutes,
      statusLabel: poi.visitType === 'external' ? 'Vista externa' : 'Visitar',
      statusType: poi.visitType === 'external' ? 'external' : 'open',
    }));

  // Segmentos entre os POIs deste dia (na ordem em que aparecem), normalizados
  const daySegments = [];
  for (let i = 0; i < dayPOIs.length - 1; i++) {
    const seg = route.segments.find(
      s => s.from === dayPOIs[i].id && s.to === dayPOIs[i + 1].id
    );
    if (seg) {
      daySegments.push(normalizeSegment(seg));
    } else {
      daySegments.push({
        from: dayPOIs[i].id,
        to: dayPOIs[i + 1].id,
        transport: 'walking',
        walkingMinutes: 5,
        distanceMeters: 300,
        path: [
          [dayPOIs[i].lat, dayPOIs[i].lng],
          [dayPOIs[i + 1].lat, dayPOIs[i + 1].lng],
        ],
        streetNotes: '',
      });
    }
  }

  // Segmento de chegada (BASE_MUNIQUE → primeiro POI) — só logística, não vai pro mapa polyline
  const arrivalSegment = route.segments.find(
    s => s.from === 'BASE_MUNIQUE' && dayPOIs.some(p => p.id === s.to)
  ) || null;

  const visitTime = dayPOIs.reduce((sum, p) => sum + (p.adjustedVisitMinutes || 0), 0);
  const walkTime = daySegments.reduce((sum, s) => sum + (s.walkingMinutes || 0), 0);
  const totalDistanceKm =
    daySegments.reduce((sum, s) => sum + (s.distanceMeters || 0), 0) / 1000;

  return {
    pois: dayPOIs,
    skippedPOIs: [],
    segments: daySegments,
    arrivalSegment,
    day,
    totalMinutes: visitTime + walkTime,
    totalDistanceKm,
    visitTime,
    walkTime,
    isWithinLimit: true, // Não aplicamos limite em dias de excursão
    poiCount: dayPOIs.length,
    openCount: dayPOIs.length,
    externalCount: dayPOIs.filter(p => p.externalOnly).length,
  };
}
