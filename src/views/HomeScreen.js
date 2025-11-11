import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { colors } from '../theme/colors';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [period, setPeriod] = useState('month'); // 'week' | 'month'
  const [showMoreTxns, setShowMoreTxns] = useState(false);
  const valueOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(valueOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(valueOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  }, [period, valueOpacity]);

  const totalSpend = period === 'month' ? 12340 : 3560;
  const deltaCopy = period === 'month' ? '+8% from last month 📈' : '+3% from last week 📈';
  const greetingName = 'Alex';

  const pieData = useMemo(
    () => [
      { name: 'Food', amount: 5400, color: '#10B981', legendFontColor: colors.textLight, legendFontSize: 12 },
      { name: 'Travel', amount: 2300, color: '#3B82F6', legendFontColor: colors.textLight, legendFontSize: 12 },
      { name: 'Shopping', amount: 1200, color: '#F59E0B', legendFontColor: colors.textLight, legendFontSize: 12 },
      { name: 'Bills', amount: 1800, color: '#EF4444', legendFontColor: colors.textLight, legendFontSize: 12 },
      { name: 'Misc', amount: 640, color: '#6B7280', legendFontColor: colors.textLight, legendFontSize: 12 },
    ],
    []
  );

  const lineLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const lineData = [420, 310, 560, 280, 730, 640, 390];

  const transactions = [
    { icon: 'fast-food', title: 'Zomato', subtitle: 'Food', amount: 540 },
    { icon: 'local-taxi', title: 'Uber', subtitle: 'Travel', amount: 230 },
    { icon: 'shopping-cart', title: 'Amazon', subtitle: 'Shopping', amount: 1200 },
    { icon: 'receipt', title: 'Electricity Bill', subtitle: 'Bills', amount: 1450 },
  ];

  const emis = [
    { title: 'Laptop EMI', perMonth: 4500, monthsLeft: 6, totalMonths: 12 },
    { title: 'Credit Card EMI', perMonth: 3200, monthsLeft: 3, totalMonths: 9 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>👋 Hi, {greetingName}!</Text>
          <Text style={styles.subGreeting}>Here’s your spending summary.</Text>
        </View>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Open settings">
          <Feather name="settings" size={22} color={colors.subtleTextLight} />
        </TouchableOpacity>
      </View>

      {/* Total Spend Overview */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Total Spend – {period === 'month' ? 'This Month' : 'This Week'}</Text>
          <View style={styles.toggleRow}>
            <ToggleButton label="This Week" active={period === 'week'} onPress={() => setPeriod('week')} />
            <ToggleButton label="This Month" active={period === 'month'} onPress={() => setPeriod('month')} />
          </View>
        </View>
        <Animated.Text style={[styles.totalValue, { opacity: valueOpacity }]}>₹ {totalSpend.toLocaleString('en-IN')}</Animated.Text>
        <Text style={styles.delta}>{deltaCopy}</Text>
      </View>

      {/* AI Insight Bubble */}
      <LinearGradient colors={[colors.primary, '#10B981']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.insightBubble}>
        <Text style={styles.insightText}>You spent 12% more on food this week 🍔</Text>
      </LinearGradient>

      {/* Pie Chart – Spend by Category */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Spend by Category</Text>
      </View>
      <View style={styles.card}>
        <PieChart
          data={pieData.map(p => ({ name: p.name, population: p.amount, color: p.color, legendFontColor: p.legendFontColor, legendFontSize: p.legendFontSize }))}
          width={screenWidth - 48}
          height={180}
          chartConfig={{
            color: () => colors.primary,
            labelColor: () => colors.textLight,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="8"
          hasLegend={false}
        />
        <View style={styles.legendWrap}>
          {pieData.map((p) => (
            <View key={p.name} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: p.color }]} />
              <Text style={styles.legendLabel}>{p.name}</Text>
              <Text style={styles.legendAmount}>₹ {p.amount.toLocaleString('en-IN')}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Weekly Spend Trend Graph */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Weekly Trend</Text>
      </View>
      <View style={styles.card}>
        <LineChart
          data={{ labels: lineLabels, datasets: [{ data: lineData }] }}
          width={screenWidth - 48}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: () => colors.primary,
            labelColor: () => colors.subtleTextLight,
            propsForDots: { r: '3', strokeWidth: '2', stroke: colors.primary },
          }}
          bezier
          style={{ marginLeft: -8 }}
        />
      </View>

      {/* Recent Transactions List */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => setShowMoreTxns((v) => !v)} accessibilityRole="button" accessibilityLabel="Toggle view more">
          <Text style={styles.viewMore}>{showMoreTxns ? 'View less' : 'View more'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        {transactions.slice(0, showMoreTxns ? transactions.length : 3).map((t) => (
          <View key={t.title} style={styles.txnItem}>
            <MaterialIcons name={t.icon} size={20} color={colors.primary} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.txnTitle}>{t.title}</Text>
              <Text style={styles.txnSubtitle}>{t.subtitle}</Text>
            </View>
            <Text style={styles.txnAmount}>₹ {t.amount.toLocaleString('en-IN')}</Text>
          </View>
        ))}
      </View>

      {/* EMI Tracker Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Active EMIs</Text>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="View all EMIs">
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        {emis.map((e) => {
          const progress = (e.totalMonths - e.monthsLeft) / e.totalMonths;
          return (
            <View key={e.title} style={{ marginBottom: 16 }}>
              <View style={styles.emiRow}>
                <Text style={styles.emiTitle}>{e.title}</Text>
                <Text style={styles.emiAmount}>₹ {e.perMonth.toLocaleString('en-IN')} / month</Text>
              </View>
              <Text style={styles.emiSubtitle}>{e.monthsLeft} months left</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

function ToggleButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.toggleBtn, active ? styles.toggleActive : styles.toggleInactive]}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      accessibilityLabel={`Toggle ${label}`}
    >
      <Text style={[styles.toggleText, active ? styles.toggleTextActive : styles.toggleTextInactive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textLight,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.subtleTextLight,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.dividerLight,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  toggleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  toggleInactive: {
    backgroundColor: '#fff',
    borderColor: colors.dividerLight,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
  },
  toggleTextInactive: {
    color: colors.subtleTextLight,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 12,
    color: colors.textLight,
  },
  delta: {
    fontSize: 13,
    color: colors.subtleTextLight,
    marginTop: 6,
  },
  insightBubble: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  insightText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
  },
  legendWrap: {
    marginTop: 12,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendLabel: {
    flex: 1,
    color: colors.textLight,
    fontSize: 13,
  },
  legendAmount: {
    color: colors.subtleTextLight,
    fontSize: 13,
  },
  viewMore: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  txnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.dividerLight,
  },
  txnTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  txnSubtitle: {
    fontSize: 12,
    color: colors.subtleTextLight,
  },
  txnAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },
  viewAll: {
    color: colors.accent,
    fontWeight: '600',
  },
  emiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emiTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  emiAmount: {
    fontSize: 13,
    color: colors.subtleTextLight,
  },
  emiSubtitle: {
    fontSize: 12,
    color: colors.subtleTextLight,
    marginTop: 2,
    marginBottom: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.dividerLight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: colors.primary,
  },
});