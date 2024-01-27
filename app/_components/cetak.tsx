"use client";
import { formatRupiah } from "@/app/_constants/AppConfig";
import { Order } from "@/app/_types/order";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import axios from "axios";
import "dayjs/locale/id";
import { useEffect, useState } from "react";

export default function Pdf() {
  const [data, setData] = useState<Order[]>([]);
  console.log(data);

  const fetchData = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/order/status/success"
    );
    return setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const styles = StyleSheet.create({
    table: {
      display: "flex",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      textAlign: "left",

      margin: 5,
      fontSize: 10,
    },
  });
  return (
    <Document>
      <Page
        size="A4"
        style={{ marginVertical: 32, marginLeft: 32, paddingRight: 64 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Laporan Penjualan
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View
              style={{
                width: 20,
                textAlign: "center",
                paddingTop: 5,
                borderRight: 1,
                marginBottom: 1,
                borderBottom: 1,
              }}
            >
              <Text style={{ fontSize: 10 }}>No.</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Produk</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>qty</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Alamat</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
          {data?.map((e: Order, i: any) => {
            const res = e;

            return (
              <View key={i} style={styles.tableRow}>
                <View
                  style={{
                    width: 20,
                    borderRight: 1,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                >
                  <Text style={{ fontSize: 10, paddingTop: 5, paddingLeft: 2 }}>
                    {i + 1}.
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{res.title}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{res.quantity as number}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{res.address}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {formatRupiah(res.total as number)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ marginTop: 60, fontSize: 10 }}>
          <View>
            <Text
              style={{ textAlign: "right" }}
            >{`Total Penjualan :  ${formatRupiah(
              data?.reduce((a: any, b: any) => a + b.total, 0)
            )}`}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
